<script>
        function togglePortSection() {
            let boxType = document.getElementById("boxType").value;
            document.getElementById("portSection").style.display = boxType === "ported" ? "block" : "none";
        }

        let boxDimensions = { width: 12, height: 12, depth: 12, wood: 0.75, numSubwoofers: 1, subwooferDiameter: 8 };

        function calculateEnclosure() {
            let width = parseFloat(document.getElementById("boxWidth").value);
            let height = parseFloat(document.getElementById("boxHeight").value);
            let depth = parseFloat(document.getElementById("boxDepth").value);
            let thickness = parseFloat(document.getElementById("woodThickness").value);
            let numSubwoofers = parseInt(document.getElementById("numSubwoofers").value);
            let subwooferDiameter = parseFloat(document.getElementById("subwooferDiameter").value);
            let boxType = document.getElementById("boxType").value;
            let output = document.getElementById("output");

            if (isNaN(width) || isNaN(height) || isNaN(depth) || isNaN(thickness) || isNaN(numSubwoofers) || isNaN(subwooferDiameter) || width <= 0 || height <= 0 || depth <= 0 || thickness <= 0) {
                output.innerHTML = "Please enter valid dimensions.";
                return;
            }

            let netWidth = width - 2 * thickness;
            let netHeight = height - 2 * thickness;
            let netDepth = depth - 2 * thickness;
            let internalVolume = (netWidth * netHeight * netDepth) / 1728;
            let internalVolumeLiters = (internalVolume * 28.3168).toFixed(2);

            let resultText = `<strong>Cut List:</strong><br>
                Front & Back Panels: ${width} x ${height} inches<br>
                Side Panels: ${depth} x ${height} inches<br>
                Top & Bottom Panels: ${width} x ${depth} inches<br>
                <strong>Internal Volume:</strong> ${internalVolume.toFixed(2)} ft³ (${internalVolumeLiters} L)<br>
                <strong>Subwoofer Cutouts:</strong> ${numSubwoofers} × ${subwooferDiameter}" Diameter`;

            output.innerHTML = resultText;

            boxDimensions = { width, height, depth, wood: thickness, numSubwoofers, subwooferDiameter };
            redraw();
        }

        function setup() {
            let canvas = createCanvas(400, 200);
            canvas.parent("sketch-container");
            noLoop();
        }

        function draw() {
            clear();
            background(220);
            fill(200);
            rect(50, 50, boxDimensions.width * 2, boxDimensions.height * 2);
            fill(0);
            let spacing = boxDimensions.width / (boxDimensions.numSubwoofers + 1);
            for (let i = 1; i <= boxDimensions.numSubwoofers; i++) {
                ellipse(50 + spacing * i * 2, 100, boxDimensions.subwooferDiameter * 2);
            }
        }
    </script>

</body>
</html>
