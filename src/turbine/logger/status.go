package logger

const black_fg = "\033[30m"
const black_bg = "\033[40m"

type status string

const (
	none     = ""
	resetC   = "\033[0m"
	errorC   = "\033[31m" + black_bg
	successC = "\033[32m" + black_bg
	warningC = "\033[33m" + black_bg
	panicC   = "\033[41m" + black_fg

	blueC   = "\033[104m" + black_fg
	cyanC   = "\033[46m" + black_fg
	greenC  = "\033[42m" + black_fg
	pinkC   = "\033[105m" + black_fg
	purpleC = "\033[45m" + black_fg
	yellowC = "\033[43m" + black_fg
)
