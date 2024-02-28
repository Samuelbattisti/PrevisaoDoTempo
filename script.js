async function obterPosicaoAtual() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function obterPrevisaoMeteorologica(latitude, longitude) {
    const apiKey = '4357a183c86d471da74163242242802';
    const api = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no}&lang=pt`;

    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('Erro ao consultar previsão');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Erro ao consultar previsão');
    }
}

async function exibirPrevisaoMeteorologica() {
    try {
        const posicao = await obterPosicaoAtual();
        const { latitude, longitude } = posicao.coords;
        const data = await obterPrevisaoMeteorologica(latitude, longitude);

        document.querySelector('#cidade').innerHTML = data.location.name;
        document.querySelector('#estado').innerHTML = data.location.region;
        document.querySelector('#icon').src = data.current.condition.icon;
        document.querySelector('#infoText').innerHTML = data.current.condition.text;
        document.querySelector('#temp').innerHTML = data.current.temp_c + 'ºC';
        document.querySelector('#velocidade').innerHTML = 'Vento: ' + data.current.wind_kph + 'km/h';
        document.querySelector('#umidade').innerHTML = 'umidade: ' + data.current.humidity + '%';
        document.querySelector('#sensacaoTermica').innerHTML = 'Sensação Térmica: ' + data.current.feelslike_c + 'ºC';
        document.querySelector('#visibilidade').innerHTML = 'Visibilidade: ' + data.current.vis_km + ' km';
    } catch (error) {
        console.error(error);
        // Tratar o erro de forma adequada, por exemplo, exibir uma mensagem ao usuário
    }
}

exibirPrevisaoMeteorologica();