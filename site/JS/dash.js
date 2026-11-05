function Dash() {
    if (Nome == '') {
        alert('Acesso a Dash apenas com Login')
    } else {
        resetar()
        dash.style.color = 'white'
        dash.style.background = 'blue'
        dash.style.boxShadow = 'none'
        TelaGrande.innerHTML = `<h1>DashBoard</h1>`
    }
}