export const svg = () => {
	return app.gulp.src(app.path.src.svg)
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(
			app.plugins.if(
				app.isBuild,
				app.plugins.svgmin({
					multipass: true,
					js2svg: {
						pretty: true,
						indent: 2
					},
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browsersync.stream());
}