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

["/ingest"; post]
fn (mut app App) ingest_video() vweb.Result {
	if !("video" in app.files) {
		app.set_status(400, "")
		return app.json({
			"error": "Missing required key: 'video'"
		})
	}

	video := app.files["video"][0]
	filename := video.filename + time.now().unix_time().str()

	id := nanoid.generate(id_options, 12) or { return app.json({ "error": error.str() } )}

	mut file := os.create("./uploads/$filename") or { 
		return app.json({"error": error.str()}) 
	}
	file.write(video.data.bytes()) or {
		return app.json({"error": error.str()})
	}
	file.close()
	return app.json({
		"id": id
	})
}