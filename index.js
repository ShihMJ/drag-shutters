const content = document.getElementById("content");
const nodes = document.getElementsByClassName("node");
let x_now = 0;
let rotate_count = 0;
let mousedown = false;

content.addEventListener('mousemove', (e) => {
	e.preventDefault();
	if (mousedown) {
		x_now = Math.max(x_now - e.movementX, 0);
		content.style.transform = "translateY(-50%) translateX(-" + x_now + "px)";
		console.log(x_now);
		for (let i = 0; i < nodes.length; i++) {
			// 中心點在 100, 寬度 200
			// 中心往左右各取 2 個，總共 5 個，由左至右應要各 rotateY 180 135 90 45 0 度
			// 由左至右的中心點分別為 100 300 500 700 900
			// 寬度共 800，故每移動 1 px 就要增減 180/800 = 0.225 度 
			// 最中間的應該要是 90 度，但我們用(世界座標x - node座標x)，會變成由左至右為 90 45 0 -45 -90
			// 所以我們全部都加 90，變成 180 135 90 45 0
			let deg = (x_now - (i * 200 + 100))*0.225 + 90;
			deg = Math.max(0, deg);
			deg = Math.min(180, deg);
			// 90 度時 scale 最大
			// 所以將 deg - 90 後，由左至右變成 90 45 0 -45 -90
			// 再用 90 去減絕對值後變成 0 45 90 45 0
			const scale = 1 + (90-Math.abs(deg-90)) / 360; 

			nodes[i].style.transform = "rotateY(" + deg + "deg) scale(" + scale + ")";
		}
	}
});
content.addEventListener('mousedown', () => mousedown = true);
content.addEventListener('mouseup', () => mousedown = false);