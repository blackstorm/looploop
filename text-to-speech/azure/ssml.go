package azure

import "fmt"

type ssml struct {
	xml string
}

// https://docs.microsoft.com/zh-cn/azure/cognitive-services/speech-service/speech-synthesis-markup
func newSSML(text, speaker string) ssml {
	xml := `
	<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="cn">
		<voice name="%s">%s</voice>
	</speak>
	`

	// https://docs.microsoft.com/zh-cn/azure/cognitive-services/speech-service/language-support#text-to-speech
	// set default to zh-CN-XiaoxiaoNeural
	if len(speaker) == 0 {
		speaker = "zh-CN-XiaoxiaoNeural"
	}

	return ssml{
		xml: fmt.Sprintf(xml, speaker, text),
	}
}

func (s ssml) toBytes() []byte {
	return []byte(s.xml)
}

func (s ssml) toString() string {
	return s.xml
}
