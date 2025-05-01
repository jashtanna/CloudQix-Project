package service

import (
	"cloudQix/repo"
	"errors"
)

func ProcessMapping(requestJSON map[string]interface{}, mapping map[string]string) (map[string]interface{}, error) {
	if requestJSON == nil || mapping == nil {
		return nil, errors.New("request JSON or mapping is nil")
	}

	return repo.MapFields(requestJSON, mapping)
}
