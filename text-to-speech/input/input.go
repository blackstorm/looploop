package input

import (
	"encoding/json"
	"io/ioutil"

	"github.com/blackstorm/looplooper/text2speech/audio"
)

type Inputer struct {
	filePath string
	Audios   []audio.Audio
}

func NewInputer(path string) (*Inputer, error) {
	bytes, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var audios []audio.Audio
	err = json.Unmarshal(bytes, &audios)
	if err != nil {
		return nil, err
	}

	return &Inputer{
		filePath: path,
		Audios:   audios,
	}, nil
}
