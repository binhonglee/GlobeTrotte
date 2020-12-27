package database

// NotExists - Return an array of int from haystack that aren't in the needles
func NotExists(haystack []int, needles []int) []int {
	needs := make(map[int]bool)
	notExists := make(map[int]bool)

	for _, v := range needles {
		needs[v] = true
	}

	for _, v := range haystack {
		if !needs[v] {
			notExists[v] = true
		}
	}
	toReturn := make([]int, len(notExists))
	i := 0
	for key, _ := range notExists {
		toReturn[i] = key
		i++
	}

	return toReturn
}
