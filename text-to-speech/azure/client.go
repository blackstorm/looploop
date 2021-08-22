package azure

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/blackstorm/looplooper/text2speech/audio"
)

const apiKey = "935f71f796624da08c2df9f7da66cc8c"

const apiEndpoint = "https://eastasia.api.cognitive.microsoft.com/sts/v1.0"
const issuetokenApi = apiEndpoint + "/issuetoken"
const text2SpeechApi = "https://eastasia.tts.speech.microsoft.com/cognitiveservices/v1"

type Client struct {
	hClient *http.Client
	token   string
}

// https://docs.microsoft.com/zh-cn/azure/cognitive-services/speech-service/rest-text-to-speech
func NewClientAndInit() (*Client, error) {
	req, err := http.NewRequest(http.MethodPost, issuetokenApi, bytes.NewReader([]byte{}))
	if err != nil {
		return nil, err
	}

	// set header
	req.Header.Set("Ocp-Apim-Subscription-Key", apiKey)
	req.Header.Set("Content-type", "application/x-www-form-urlencoded")

	// init http client
	hClient := &http.Client{}
	hClient.Timeout = time.Second * 10

	// send request
	resp, err := hClient.Do(req)
	if err != nil {
		return nil, err
	}

	// read res
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return &Client{
		hClient: hClient,
		token:   string(body),
	}, nil
}

func (c *Client) Text2Speech(audio audio.Audio, format string) ([]byte, error) {
	fmt.Printf("text 2 speech call. text is %s format to %s\n", audio.Text, format)
	// create a ssml xml
	ssml := newSSML(audio.Text, audio.Speaker)

	// make a request
	req, err := http.NewRequest(http.MethodPost, text2SpeechApi, bytes.NewReader(ssml.toBytes()))
	if err != nil {
		return nil, err
	}

	// set header
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.token))
	req.Header.Set("Content-type", "application/ssml+xml")
	req.Header.Set("X-Microsoft-OutputFormat", "audio-48khz-96kbitrate-mono-mp3")
	req.Header.Set("User-Agent", "looplooper-text2Speech-client-gohttp")

	// send request
	resp, err := c.hClient.Do(req)
	if err != nil {
		return nil, err
	}

	bytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return bytes, nil
}

// Get the issued token
func (c *Client) GetToken() string {
	return c.token
}
