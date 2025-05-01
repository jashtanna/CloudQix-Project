package repo

import (
	"strings"
)

type JSON map[string]interface{}
//custom JSON type to handle JSON data

func MapFields(input JSON, mapping map[string]string) (JSON, error) {
	result := make(JSON)

	for outKey, mapPath := range mapping {
		if mapPath == "" {
			result[outKey] = ""
			continue
		}

		// Split the path by dot to access nested keys
		parts := strings.Split(mapPath, ".")
		curr := input
		var val interface{}
		
			// If it's the last key in the path, assign the value
		for i, key := range parts {
			if i == len(parts)-1 {
				val, _ = curr[key]
				break
			}

			// Try to go one level deeper into the nested map
			next, ok := curr[key].(map[string]interface{})
			if !ok {
				val = nil
				break
			}
			curr = next
		}

		// Store the extracted value under the target key here we can assing the value to the result map
		result[outKey] = val
	}

	return result, nil
}
