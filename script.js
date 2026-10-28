// ============ ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ============
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });
});

// ============ УТИЛИТЫ ============
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function nz(min, max) {
    let v = 0;
    while (v === 0) v = rnd(min, max);
    return v;
}
function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { let t = b; b = a % b; a = t; }
    return a || 1;
}
function fmt(v) {
    if (v > 0) return '+' + v;
    return String(v);
}
function updateMath() {
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

const answers = {};

// ============ ПОКАЗ ОТВЕТА ============
function showAnswer(n) {
    const box = document.getElementById('answer' + n);
    if (!box) return;
    if (box.classList.contains('visible')) {
        box.classList.remove('visible');
        return;
    }
    box.innerHTML = answers[n] || 'Сначала сгенерируйте задачу.';
    box.classList.add('visible');
    updateMath();
}

// ============ ЗАДАЧА 1 ============
function generateTask1() {
    const x1 = rnd(-5, 5), y1 = rnd(-5, 5), z1 = rnd(-5, 5);
    let x2, y2, z2;
    do {
        x2 = rnd(-5, 5); y2 = rnd(-5, 5); z2 = rnd(-5, 5);
    } while (x1 === x2 && y1 === y2 && z1 === z2);

    document.getElementById('task1').innerHTML = `
        Составьте каноническое уравнение прямой, проходящей через точки
        $M_1(${x1};\\, ${y1};\\, ${z1})$ и $M_2(${x2};\\, ${y2};\\, ${z2})$.
        Найдите координаты направляющего вектора $\\vec{s}$.
    `;

    const dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
    answers[1] = `
        <b>Решение:</b><br>
        1) Направляющий вектор: $\\vec{s} = \\overrightarrow{M_1M_2} = \\{${x2} - (${x1});\\, ${y2} - (${y1});\\, ${z2} - (${z1})\\} = \\{${dx};\\, ${dy};\\, ${dz}\\}$.<br>
        2) Каноническое уравнение прямой:
        $$ \\frac{x - (${x1})}{${dx}} = \\frac{y - (${y1})}{${dy}} = \\frac{z - (${z1})}{${dz}} $$
        <b>Ответ:</b> $\\vec{s} = \\{${dx};\\, ${dy};\\, ${dz}\\}$; уравнение — см. выше.
    `;
    document.getElementById('answer1').classList.remove('visible');
    document.getElementById('answer1').innerHTML = '';
    updateMath();
}

// ============ ЗАДАЧА 2 ============
function generateTask2() {
    const x0 = rnd(-3, 3), y0 = rnd(-3, 3), z0 = rnd(-3, 3);
    const a = rnd(-3, 3), b = rnd(-3, 3), c = rnd(-3, 3);
    const m = nz(-3, 3), n = nz(-3, 3), p = nz(-3, 3);

    document.getElementById('task2').innerHTML = `
        Найдите расстояние от точки $M_0(${x0};\\, ${y0};\\, ${z0})$
        до прямой, заданной уравнением:
        $$\\frac{x - (${a})}{${m}} = \\frac{y - (${b})}{${n}} = \\frac{z - (${c})}{${p}}$$
    `;

    const vx = x0 - a, vy = y0 - b, vz = z0 - c;
    const cx = vy * p - vz * n;
    const cy = vz * m - vx * p;
    const cz = vx * n - vy * m;
    const crossSq = cx * cx + cy * cy + cz * cz;
    const sSq = m * m + n * n + p * p;
    const d = Math.sqrt(crossSq / sSq);

    answers[2] = `
        <b>Решение:</b><br>
        1) Точка на прямой: $M_1(${a};\\, ${b};\\, ${c})$, направляющий вектор $\\vec{s} = \\{${m};\\, ${n};\\, ${p}\\}$.<br>
        2) $\\overrightarrow{M_1M_0} = \\{${vx};\\, ${vy};\\, ${vz}\\}$.<br>
        3) $\\overrightarrow{M_1M_0} \\times \\vec{s} = \\{${cx};\\, ${cy};\\, ${cz}\\}$.<br>
        4) $d = \\dfrac{\\sqrt{(${cx})^2 + (${cy})^2 + (${cz})^2}}{\\sqrt{(${m})^2 + (${n})^2 + (${p})^2}} = \\dfrac{\\sqrt{${crossSq}}}{\\sqrt{${sSq}}} \\approx ${d.toFixed(4)}$.<br>
        <b>Ответ:</b> $d \\approx ${d.toFixed(4)}$.
    `;
    document.getElementById('answer2').classList.remove('visible');
    document.getElementById('answer2').innerHTML = '';
    updateMath();
}

// ============ ЗАДАЧА 3 ============
function generateTask3() {
    let A, B, C, AB, AC, nrm;
    do {
        A = [rnd(-4, 4), rnd(-4, 4), rnd(-4, 4)];
        B = [rnd(-4, 4), rnd(-4, 4), rnd(-4, 4)];
        C = [rnd(-4, 4), rnd(-4, 4), rnd(-4, 4)];
        AB = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
        AC = [C[0] - A[0], C[1] - A[1], C[2] - A[2]];
        nrm = [
            AB[1] * AC[2] - AB[2] * AC[1],
            AB[2] * AC[0] - AB[0] * AC[2],
            AB[0] * AC[1] - AB[1] * AC[0]
        ];
    } while (nrm[0] === 0 && nrm[1] === 0 && nrm[2] === 0);

    document.getElementById('task3').innerHTML = `
        Составьте общее уравнение плоскости, проходящей через три точки:
        $$A(${A[0]};\\, ${A[1]};\\, ${A[2]}),\\quad
          B(${B[0]};\\, ${B[1]};\\, ${B[2]}),\\quad
          C(${C[0]};\\, ${C[1]};\\, ${C[2]})$$
    `;

    const g = gcd(gcd(Math.abs(nrm[0]), Math.abs(nrm[1])), Math.abs(nrm[2]));
    const nn = nrm.map(v => v / g);
    const D = -(nn[0] * A[0] + nn[1] * A[1] + nn[2] * A[2]);

    answers[3] = `
        <b>Решение:</b><br>
        1) $\\overrightarrow{AB} = \\{${AB[0]};\\, ${AB[1]};\\, ${AB[2]}\\}$,
           $\\overrightarrow{AC} = \\{${AC[0]};\\, ${AC[1]};\\, ${AC[2]}\\}$.<br>
        2) $\\vec{n} = \\overrightarrow{AB} \\times \\overrightarrow{AC} = \\{${nrm[0]};\\, ${nrm[1]};\\, ${nrm[2]}\\}$,
           после сокращения: $\\{${nn[0]};\\, ${nn[1]};\\, ${nn[2]}\\}$.<br>
        3) $D = -(${nn[0]}\\cdot(${A[0]}) + (${nn[1]})\\cdot(${A[1]}) + (${nn[2]})\\cdot(${A[2]})) = ${D}$.<br>
        <b>Ответ:</b> $${nn[0]}x ${fmt(nn[1])}y ${fmt(nn[2])}z ${fmt(D)} = 0$.
    `;
    document.getElementById('answer3').classList.remove('visible');
    document.getElementById('answer3').innerHTML = '';
    updateMath();
}

// ============ ЗАДАЧА 4 ============
function generateTask4() {
    const x0 = rnd(-4, 4), y0 = rnd(-4, 4), z0 = rnd(-4, 4);
    const A = nz(-4, 4), B = nz(-4, 4), C = nz(-4, 4), D = rnd(-10, 10);

    document.getElementById('task4').innerHTML = `
        Найдите расстояние от точки $M(${x0};\\, ${y0};\\, ${z0})$
        до плоскости, заданной уравнением:
        $$ ${A}x ${fmt(B)}y ${fmt(C)}z ${fmt(D)} = 0 $$
    `;

    const num = Math.abs(A * x0 + B * y0 + C * z0 + D);
    const denSq = A * A + B * B + C * C;
    const rho = num / Math.sqrt(denSq);

    answers[4] = `
        <b>Решение:</b><br>
        1) $\\vec{n} = \\{${A};\\, ${B};\\, ${C}\\}$.<br>
        2) $\\rho = \\dfrac{|${A}\\cdot(${x0}) + (${B})\\cdot(${y0}) + (${C})\\cdot(${z0}) + (${D})|}{\\sqrt{(${A})^2 + (${B})^2 + (${C})^2}} = \\dfrac{${num}}{\\sqrt{${denSq}}} \\approx ${rho.toFixed(4)}$.<br>
        <b>Ответ:</b> $\\rho \\approx ${rho.toFixed(4)}$.
    `;
    document.getElementById('answer4').classList.remove('visible');
    document.getElementById('answer4').innerHTML = '';
    updateMath();
}

// ============ ЗАДАЧА 5 ============
function generateTask5() {
    const m1 = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];
    const m2 = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];

    document.getElementById('task5').innerHTML = `
        Найдите угол между скрещивающимися прямыми, если известны
        координаты их направляющих векторов:
        $$\\vec{m}_1 = \\{${m1[0]};\\, ${m1[1]};\\, ${m1[2]}\\},\\quad
          \\vec{m}_2 = \\{${m2[0]};\\, ${m2[1]};\\, ${m2[2]}\\}$$
    `;

    const dot = m1[0] * m2[0] + m1[1] * m2[1] + m1[2] * m2[2];
    const len1Sq = m1[0]*m1[0] + m1[1]*m1[1] + m1[2]*m1[2];
    const len2Sq = m2[0]*m2[0] + m2[1]*m2[1] + m2[2]*m2[2];
    const cos = Math.abs(dot) / Math.sqrt(len1Sq * len2Sq);
    const angleDeg = Math.acos(Math.min(1, cos)) * 180 / Math.PI;

    answers[5] = `
        <b>Решение:</b><br>
        1) $\\vec{m}_1 \\cdot \\vec{m}_2 = ${m1[0]}\\cdot(${m2[0]}) + (${m1[1]})\\cdot(${m2[1]}) + (${m1[2]})\\cdot(${m2[2]}) = ${dot}$.<br>
        2) $|\\vec{m}_1| = \\sqrt{${len1Sq}}$, $|\\vec{m}_2| = \\sqrt{${len2Sq}}$.<br>
        3) $\\cos\\alpha = \\dfrac{|${dot}|}{\\sqrt{${len1Sq}} \\cdot \\sqrt{${len2Sq}}} \\approx ${cos.toFixed(4)}$.<br>
        <b>Ответ:</b> $\\alpha = \\arccos(${cos.toFixed(4)}) \\approx ${angleDeg.toFixed(2)}^\\circ$.
    `;
    document.getElementById('answer5').classList.remove('visible');
    document.getElementById('answer5').innerHTML = '';
    updateMath();
}

// ============ ЗАДАЧА 6 ============
function generateTask6() {
    const c = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];
    const n = [nz(-4, 4), nz(-4, 4), nz(-4, 4)];

    document.getElementById('task6').innerHTML = `
        Найдите угол между прямой и плоскостью. Известно, что
        направляющий вектор прямой $\\vec{c} = \\{${c[0]};\\, ${c[1]};\\, ${c[2]}\\}$,
        а вектор нормали плоскости $\\vec{n} = \\{${n[0]};\\, ${n[1]};\\, ${n[2]}\\}$.
    `;

    const dot = c[0] * n[0] + c[1] * n[1] + c[2] * n[2];
    const lenCSq = c[