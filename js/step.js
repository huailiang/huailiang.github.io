{
	tabColor: "#a00", editorTheme: "dark", backgroundColor: "#333", 

	uniforms: [
		{ type: "boolean", value: true, name: "odd_step", GUIName: "Step on odd pix" },
		{ type: "boolean", value: false, name: "show_derivative", GUIName: "Show Derivative"}
	],

	fragmentShader: [
		"uniform vec2 resolution;",
		"uniform float odd_step;",
		"uniform float show_derivative;",
		"",
		"void main()	{",
		"// center_x is at center x snapped to the nearest even position",
		"float center_x = floor(resolution.x / 4.0) * 2.0;",
		"",
		"// snap center_x to an odd number if odd_step is 1",
		"center_x += odd_step;",
		"",
		"// Step function is 0 when p.x < step_pos, 1 when p.x >= step_pos",
		"float step = ceil(clamp((gl_FragCoord.x - center_x) / resolution.x, 0.0, 1.0));",
		"",
		"// The alpha variable is used to select one of two colors",
		"float alpha = show_derivative == 1.0 ? dFdx(step) : step;",
		"",
		"vec3 color = mix(vec3(0.96, 0.96, 0.68), vec3(0.68, 0.1, 0.1), alpha);",
		"",
		"gl_FragColor = vec4(color, 1.0);",
	"}"
	].join("\n"),
}