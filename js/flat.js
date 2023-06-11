{
	tabColor: "#cf772a", editorTheme: "dark", backgroundColor: "#333",

	meshes: [
		{ type: "teapot", name: "Teapot", doubleSided: true},
		{ type: "sphere",  name: "Sphere"},
	],

	uniforms: [
		{ type: "boolean", value: true, name: "bFlat", GUIName: "Flat shading" },
		{ type: "color", value: "#cf070a", name: "diffuseColor", GUIName: "Color"}
	],

	vertexShader: [
		"varying vec3 normalInterp;",
		"varying vec3 vertPos;",
		"",
		"void main(){",
		"    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"    vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);",
		"",
		"    normalInterp = normalMatrix * normal;",
		"    vertPos = vec3(vertPos4) / vertPos4.w;",
		"}"
	].join("\n"),

	fragmentShader: [
        "precision mediump float;",
        "",
		"varying vec3 vertPos;",
		"varying vec3 normalInterp;",
		"",
		"uniform float bFlat;",
		"uniform vec3 diffuseColor;",
		"",
		"const vec3 lightPos 	= vec3(200,60,100);",
		"const vec3 specColor 	= vec3(1.0, 1.0, 1.0);",
		"",
		"void main() {",
		"	vec3 ambientColor = diffuseColor * 0.4;",		
		"	vec3 normal = mix(normalize(normalInterp), normalize(cross(dFdx(vertPos), dFdy(vertPos))), bFlat);",
		"	vec3 lightDir = normalize(lightPos - vertPos);",
		"",
		"	float lambertian = max(dot(lightDir,normal), 0.0);",
		"	float specular = 0.0;",
		"",
		"	if(lambertian > 0.0) {",
		"		vec3 viewDir = normalize(-vertPos);",
		"		vec3 halfDir = normalize(lightDir + viewDir);",
		"		float specAngle = max(dot(halfDir, normal), 0.0);",
		"		specular = pow(specAngle, 16.0);",
		"	}",
		"",
		"	gl_FragColor = vec4(ambientColor + lambertian * diffuseColor + specular * specColor, 1.0);",
		"}"
	].join("\n"),
}