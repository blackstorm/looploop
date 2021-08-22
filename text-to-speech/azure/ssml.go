package azure

import "fmt"

type ssml struct {
	xml string
}

// https://docs.microsoft.com/zh-cn/azure/cognitive-services/speech-service/speech-synthesis-markup
func newSSML(text string) ssml {
	xml := `
	<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="string">
		<voice name="en-US-JennyNeural">%s</voice>
	</speak>
	`
	return ssml{
		xml: fmt.Sprintf(xml, text),
	}
}

func (s ssml) toBytes() []byte {
	return []byte(s.xml)
}

func (s ssml) toString() string {
	return s.xml
}
