module main
import vweb
import os
import time
import invipal.nanoid

const (
	id_options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
)

struct App {
	vweb.Context
}

fn main() {
	vweb.run(&App{}, 5000)
}

["/"; post]
fn (mut app App) ingest_video() vweb.Result {
	if !("video" in app.files) {
		app.set_status(400, "")
		return app.json({
			"error": "Missing required key: 'video'"
		})
	}

	video := app.files["video"][0]

	id := nanoid.generate(id_options, 12) or { return app.json({ "error": "couldn't generate id" } )}

	mut file := os.create("./uploads/$id") or { 
		return app.json({"error": "couldn't create file"}) 
	}
	file.write(video.data.bytes()) or {
		return app.json({"error": "couldn't write file"})
	}

	file.close()
	
	return app.json({
		"id": id
	})
}