package output

import "fmt"

type FileOutputer struct {
	path string
}

func NewFileOutputer(path string) FileOutputer {
	return FileOutputer{path: path}
}

func (f FileOutputer) Output(bytes []byte, fileName string) error {
	fmt.Printf("output to '%s' TODO \n", f.path+"/"+fileName)
	// TODO
	return nil
}
