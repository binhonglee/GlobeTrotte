package logger

const blackFG = "\033[30m"
const blackBG = "\033[40m"

type status string

const (
	none     = ""
	resetC   = "\033[0m"
	errorC   = "\033[31m" + blackBG
	successC = "\033[32m" + blackBG
	warningC = "\033[33m" + blackBG
	panicC   = "\033[41m" + blackFG

	blueC   = "\033[104m" + blackFG
	cyanC   = "\033[46m" + blackFG
	greenC  = "\033[42m" + blackFG
	pinkC   = "\033[105m" + blackFG
	purpleC = "\033[45m" + blackFG
	yellowC = "\033[43m" + blackFG
)
