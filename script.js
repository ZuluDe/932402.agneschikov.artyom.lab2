/* 
    В следующей лабораторной работе заменю логику проверки на шкалу LUFS.
    В данной предметной области использовать шкалу dB SPL немного не корректно,
    т.к. с помощью нее можно определить только уровень выходного сигнала на наушниках конкретного пользователя,
    а к уровню громкости самих треков данная шкала никакого отношения не имеет.
    Стандартом для выгрузки треков всегда являются 0 dBFS по пикам и диапозон от -14 LUFS в среднем,
    где LUFS и отвечает за то, как ухо человека "слышит" громкость цифрового сигнала.
*/

const name = prompt('Введите ваше имя:');
const user = name?.trim() || 'Гость';

const volumes = [75, 85, 92, 111, 74, 98, 68];

function getSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function getMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function getLoud(arr) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 90) {
            res.push(arr[i]);
        }
    }
    return res;
}

let quietCount = 0;
let quietSum = 0;

for (let i = 0; i < volumes.length; i++) {
    if (volumes[i] <= 75) {
        quietCount++;
        quietSum += volumes[i];
    }
}

const quietAvg = quietCount > 0 ? (quietSum / quietCount).toFixed(0) : 0;

const total = getSum(volumes);
const avg = (total / volumes.length).toFixed(0);
const loud = getLoud(volumes);
const max = getMax(volumes);

alert(`Привет, ${user}! Средняя громкость: ${avg} dB, громких треков: ${loud.length}`);

console.log(`Количество тихих треков: ${quietCount}`);
console.log(`Средняя громкость тихих треков: ${quietAvg} dB`);

if (max >= 105) {
    console.warn(`Максимальная громкость ${max} dB. Такая громкость может повредить слух — используйте наушники с ограничением!`);
}

const audios = document.querySelectorAll('audio');

audios.forEach(a => {
    a.addEventListener('play', () => {
        audios.forEach(other => {
            if (other !== a) {
                other.pause();
            }
        });
    });
});