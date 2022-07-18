package parsing

import (
	"testing"
)

func TestParsing(t *testing.T) {
	resp := Parse("https://binhong.me")
	if resp.URL != "https://binhong.me" {
		t.Errorf("output URL is %s instead of https://binhong.me", resp.URL)
	}
	if resp.Title != "BinHong Lee" {
		t.Errorf("Output URL is %s instead of \"BinHong Lee\"", resp.Title)
	}
	if resp.Description != "👋 I'm a 🇲🇾 Software Engineer currently based in the Bay Area." {
		t.Errorf("Output URL is %s instead of \"👋 I'm a 🇲🇾 Software Engineer currently based in the Bay Area.\"", resp.Description)
	}
	if resp.Error != None {
		t.Errorf("Expected no errors but got %v instead", resp.Error)
	}
}

func TestParsingURLError(t *testing.T) {
	resp := Parse("words")
	if resp.Error == None {
		t.Errorf("Expected parsing error but got None instead")
	}
}
