//Ajustar a pantalla de consulta de saldo
var screenOrientation = "";
if (window.matchMedia("(min-width: 1200px)").matches) {
    screenOrientation = "landscape";
  } else {
    screenOrientation = "portrait";
    document.querySelector(".charge-info__title").innerHTML = "Historial de movimientos"
    const tickets = document.getElementById("Tks").parentElement;
    tickets.classList.add("saldo-containerTK")
  }


//Desactivar Zoom
document.body.addEventListener('touchstart', function(e) {
    if ( (e.touches.length > 1) || e.targetTouches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
}, {passive: false});

 //Desactivar click derecho.
document.addEventListener('contextmenu', event => event.preventDefault());

function masterFunction(componentes) {
    componentes = JSON.parse(componentes);
    componentes.forEach( ({obj, is_visible, text, value, available}) => {
        setComponent(obj, is_visible, text, value, available);
    });
}

function setComponent( componente, is_visible, text, value, available) {
    var component = document.getElementById(componente);
    setLabel(component, componente);


    if ( componente=='checkBalanceWait'){
        document.querySelector('.background').classList.add("background-strong");
    }
    if (componente=='consultaStandBy'){
        if(is_visible=='true'){
            document.querySelector('.background').classList.add("background-strong");
        } else {
            document.querySelector('.background').classList.remove("background-strong");
        }
    }
    if ( componente === 'promociones' ) {
        if ( value !== 'null' ) {
            setPromociones(value);
        } else {
            cleanPromociones();
        }
    } else {
        if ( componente === 'consultaSaldo' ) {
            if ( value !== 'null' ) {
                setChargeInfoTable(value);
            } else {
                document.getElementById("tableFooter").style.display = "none";
            }
        } else {
            if (available) {
                if (JSON.parse(available)) {
                    is_visible = false;
                }
            }
            JSON.parse(is_visible) ? (component.style.display = 'flex') : (component.style.display = 'none');
            if ( (value !== 'null') && (text !== 'null')) {
                if (componente === 'btnNewCard') {
                    component.innerHTML = `${text} ${value}`;
                } else {
                    component.innerHTML = `${text}${value}`;
                }
            } else {
                if (text !== 'null') {
                    component.innerHTML = text;
                } else {
                    if (value !== 'null') {
                        component.innerHTML = value;
                    }
                }
            }
        }
    }
}

function setLabel(componenteNodo, componenteNombre, extra) {

    if (componenteNombre === 'btnAyuda') {
        componenteNodo.innerHTML = language.btnAyuda;
    }
    if (componenteNombre === 'btnConsultaSaldo') {
        componenteNodo.innerHTML = language.btnConsultaSaldo;
    }
    if (componenteNombre === 'btnNewCard') {
        componenteNodo.innerHTML = language.btnNewCard;
    }
    if (componenteNombre === 'btnTarjeta') {
        document.getElementById('btnTarjetaTitle').innerHTML = language.cardBtn.title;
        document.getElementById('cardBtn').innerHTML = language.cardBtn.text;
    }
    if (componenteNombre === 'finTransaccionSuccess') {
        chargedLabel.innerHTML = language.finTransaccionSuccess.ChargedLabel;
        promoWonLabel.innerHTML = language.finTransaccionSuccess.promoWonLabel;
    }

    if (componenteNombre === 'finTransaccionError') {
        finTransaccionErrorMessage.innerHTML = language.finTransaccionError.title;
    }
    if (componenteNombre === 'promo') {
        const title = componenteNodo.querySelector(`#${componenteNodo.id}Title`);
        title.innerHTML = language.promotion.title;
        const charging = componenteNodo.querySelector(`#${componenteNodo.id}Charging`);
        charging.innerHTML = language.promotion.charging;
        const receive = componenteNodo.querySelector(`#${componenteNodo.id}Receive`);
        receive.innerHTML = language.promotion.receive;
        const item1 = componenteNodo.querySelector(`#${componenteNodo.id}Item1`);
        item1.innerHTML = language.promotion.item1;
        const item2 = componenteNodo.querySelector(`#${componenteNodo.id}Item2`);
        item2.innerHTML = language.promotion.item2;
        const item3 = componenteNodo.querySelector(`#${componenteNodo.id}Item3`);
        item3.innerHTML = language.promotion.item3;
        const needed = extra.querySelector(`#${componenteNodo.id}Needed`);
        needed.innerHTML = language.promotion.needed;
        for ( let i = 1; i < 6; i++ ) {
            if (
                document.getElementById(`moneyNeeded${i}`).innerHTML === '$0' || 
                document.getElementById(`moneyNeeded${i}`).innerHTML === '0'
            ) {
                document.getElementById(`promo${i}Activated`).innerHTML = language.promotion.activated;
            }
        }
    }
    if (componenteNombre === 'btnBack') {
        componenteNodo.innerHTML = language.btnBack;
    }
    if (componenteNombre === 'messageBoxNewCard') {
        componenteNodo.innerHTML = language.messageBox.messageBoxNewCard;
    }
    if (componenteNombre === 'messageBoxSlideCard') {
        componenteNodo.innerHTML = language.messageBox.messageBoxSlideCard;
    }
    if (componenteNombre === 'messageBoxBalance') {
        componenteNodo.innerHTML = language.messageBox.messageBoxBalance;
    }
    if (componenteNombre === 'helpScreen') {
        backFromHelp.innerHTML = language.helpScreen.btnBack;
        chargeTitle.innerHTML = language.helpScreen.charge.title;
        chargeItem1.innerHTML = language.helpScreen.charge.chargeItem1;
        chargeItem2.innerHTML = language.helpScreen.charge.chargeItem2;
        chargeItem3.innerHTML = language.helpScreen.charge.chargeItem3; 
        consultaSaldoTitle.innerHTML = language.helpScreen.consultaSaldo.title; 
        consultaSaldoItem1.innerHTML = language.helpScreen.consultaSaldo.consultaSaldoItem1; 
/*         consultaSaldoItem2.innerHTML = language.helpScreen.consultaSaldo.consultaSaldoItem2;  */
        newCardHelpScreen.innerHTML = language.btnNewCard;
/*         consultaSaldoHelp.innerHTML = language.btnConsultaSaldo; */
    }
    if (componenteNombre === 'outOfOrderTitle') {
        if (screenOrientation == 'landscape'){
            outOfOrderTitle.innerHTML = language.outOfOrder.title;
        } else {
            outOfOrderTitle.innerHTML = language.balanceOutOfOrder.title;
        }
    }
    if (componenteNombre === 'outOfOrderTitleMessage' || componenteNombre === 'outOfOrderMessage') {
        if (screenOrientation == 'landscape'){
        outOfOrderMessage.innerHTML = language.outOfOrder.text;
    } else {
        outOfOrderMessage.innerHTML = language.balanceOutOfOrder.text;
    }
    }
    if (componenteNombre === 'confirmBtn') {
        confirmBtn.innerHTML = language.btnPosnet;
    }
    if (componenteNombre === 'modalTitle') {
        modalTitle.innerHTML = language.modal.title;
    }
    if (componenteNombre === 'modalText') {
        modalText.innerHTML = language.modal.text;
    }
    if (componenteNombre === 'btnModal') {
        btnModal.innerHTML = language.modal.btnModal;
    }
    if (componenteNombre === 'consultaStandBy') {
        
        words = language.titleConsultaSaldo.split(" ");

        let title = "";
        words.forEach((w)=> {
            title += `<h2>${w.toUpperCase()}</h2>`

        });

        componenteNodo.innerHTML = title;
    }
    if (componenteNombre === 'checkBalanceWait') {
        words = language.checkBalanceWait.split(" ");

        let title = "";
        words.forEach((w)=> {
            title += `<h2>${w.toUpperCase()}</h2>`

        });

        componenteNodo.innerHTML = `<h2>${title.toUpperCase()}</h2>`;
    }
}

function closeModal() {
    pywebview.api.aceptoRecarga();
}

function setChargeInfoTable({chargeInfoTable, card_number, credits_value, bonus_value, tks_value, qty_value}) {
    document.getElementById('chargeInfo').style.display = 'flex';
    document.getElementById('chargeInfoTable').style.display = screenOrientation=="landscape" ? 'inline': 'block';
    if( screenOrientation == 'landscape') {
        document.getElementById('btnBack').style.display = 'flex';
        }
    document.getElementById('tableFooter').style.display = 'flex';
    document.getElementById('tableFooter').innerHTML = language.footerChargeTable;
    var cardNumber = document.getElementById('card-number');
    var credits = document.getElementById('credits');
    var bonus = document.getElementById('bonus');
    var tks = document.getElementById('Tks');
    var qty = document.getElementById('Qty');
    credits.display = 'flex';
    credits.innerHTML = credits_value;
    bonus.display = 'flex';
    bonus.innerHTML = bonus_value;
    tks.display = 'flex';
    tks.innerHTML = tks_value;
    qty.display = 'flex';
    qty.innerHTML = qty_value;
    cardNumber.style.display = 'flex'; 
    cardNumber.innerHTML = card_number; 
    chargeInfoTable = chargeInfoTable.replace(/'/g,"\"");
    chargeInfoTable =  JSON.parse(chargeInfoTable);
    chargeInfoTable.forEach(getRaw);
    var result = '';
    var total = '';
    function getRaw(item) {
        result = '';
        item.forEach(getI);
        result = '<tr>'+result+'</tr>';
        total += result;
        document.getElementById('chargeInfoTable').innerHTML = '<table><tr><th>Fecha</th><th>Sistema</th><th>Tipo</th><th>Divisa</th><th>Cantidad</th>'+total+'</tr></table>';
    }
    function getI(i) {  
        result += '<td>'+i+'</td>';
        return result;
    } 
}

function helpActivated() {
    setTimeout( () => {
        btnAyuda.style.backgroundImage = 'linear-gradient( 180deg, #FFF7C2 10%, #FFE747 60%, #FFDE0A )';
    }, 150);
    btnAyuda.style.backgroundImage = 'linear-gradient( 180deg, #ffe647 , #ffe647 )';
    pywebview.api.helpActivated();
}

function consultaSaldoActivated() {
    var consultaSaldoBtn = document.getElementById('btnConsultaSaldo');
    setTimeout( () => {
        consultaSaldoBtn.style.backgroundImage = 'linear-gradient( 180deg, #FFF6EB 5%, #FFB65C 60%, #F58700 )';
    }, 150);
    consultaSaldoBtn.style.backgroundImage = 'linear-gradient( 180deg, #FFB65C, #FFB65C )';
    pywebview.api.consultaSaldoActivated();
}

function newCardActivated() {
    var newCard = document.getElementById('btnNewCard');
    setTimeout( () => {
        newCard.style.backgroundImage = 'linear-gradient( 180deg, #fd877a 1%, #F32C16 60%, #C21D0A )';
    }, 150);
    newCard.style.backgroundImage = 'linear-gradient( 180deg, #F32C16, #F32C16 )';
    pywebview.api.newCardActivated();
}

function cardActivated() {
    var cardBtn = document.getElementById('cardBtn');
    setTimeout( () => {
        cardBtn.style.boxShadow = '0 10px 10px -5px';
    }, 150);
    cardBtn.style.boxShadow = 'none';
    pywebview.api.cardActivated();
}

function backHome() {
    var cargarBtn = document.getElementById('btnBack');
    setTimeout( () => {
        cargarBtn.style.backgroundImage = 'linear-gradient( 180deg, #bcf8d5 10%, #36fc88 60%, #03b94f )';
    }, 150);
    cargarBtn.style.backgroundImage = 'linear-gradient( 180deg, #36fc88, #36fc88 )';
    pywebview.api.backHome();
}

function setValueMonto( valueId, monto, currency, is_visible ) {
    if (JSON.parse(is_visible)) {
        document.getElementById(`value${valueId}`).style.display = 'flex';
        if (valueId!='Personalizado'){
        document.getElementById(`valueMonto${valueId}`).innerHTML = monto;
        document.getElementById(`valueSimbolo${valueId}`).innerHTML = currency;
        } else {
            document.getElementById(`valueSaldoPersonalizado`).innerHTML = monto;
        }
    } else {
        document.getElementById(`value${valueId}`).style.display = 'none';
    }
}

function onValueSelected(valueId) {
    var valueSelected = document.getElementById(valueId);
    setTimeout( () => {
        valueSelected.style.boxShadow = '0px 0px 5px 1px rgba(0, 0, 0, 0.7)';
    }, 150);
    valueSelected.style.boxShadow = 'none';
    if (valueId === 'valuePersonalizado') {
        document.getElementById('displayValue').innerHTML = '$';
    }
    pywebview.api.onValueSelected(valueId);
}

function mostrarValor( displayValue, valorBtn ) {
    if ( document.getElementById(displayValue).innerHTML  === '$' &&  valorBtn === '.') return;
    document.getElementById(displayValue).innerHTML =  document.getElementById(displayValue).innerHTML + valorBtn;
    var newDisplayValue = document.getElementById(displayValue).innerHTML;
    if (newDisplayValue.includes('.')) {
        var decimals = newDisplayValue.split('.')[1];
        if (decimals.length > 2) {
            eliminarValor()
        }
    }
    if ( newDisplayValue.length > 7 ) {
        eliminarValor()
    }
    if ( newDisplayValue.includes('..') ) {
        eliminarValor()
    }
    if ( newDisplayValue.split(".").length - 1 > 1 ) {
        eliminarValor()
        return ;
    }
} 

function eliminarValor() {
    var displayValue = document.getElementById('displayValue').innerHTML;
    if (displayValue.length > 1) {
        var newDisplayValue = displayValue.substr(0, displayValue.length - 1);
        document.getElementById('displayValue').innerHTML = newDisplayValue
    }
}

function confirmBtnActivated() {
    var newDisplayValue = document.getElementById('displayValue').innerHTML;
    pywebview.api.confirmBtnActivated(newDisplayValue);
    document.getElementById('displayValue').innerHTML = '$';
}

function btnBackHomeFromHelp() {
    var backFromHelp = document.getElementById('backFromHelp');
    setTimeout( () => {
        backFromHelp.style.backgroundImage = 'linear-gradient( 180deg, #bcf8d5 10%, #36fc88 60%, #03b94f )';
    }, 150);
    backFromHelp.style.backgroundImage = 'linear-gradient( 180deg, #36fc88, #36fc88 )';
    pywebview.api.backHome();
}

function cleanPromociones() {
    document.getElementById('promo1').style.display = 'none';
    document.getElementById('footer1').style.display = 'none';
    document.getElementById('promo2').style.display = 'none';
    document.getElementById('footer2').style.display = 'none';
    document.getElementById('promo3').style.display = 'none';
    document.getElementById('footer3').style.display = 'none';
    document.getElementById('promo4').style.display = 'none';
    document.getElementById('footer4').style.display = 'none';
    document.getElementById('promo5').style.display = 'none';
    document.getElementById('footer5').style.display = 'none';
    document.getElementById('promoActivatedImg1').style.display = 'none';
    document.getElementById('promoActivatedImg2').style.display = 'none';
    document.getElementById('promoActivatedImg3').style.display = 'none';
    document.getElementById('promoActivatedImg4').style.display = 'none';
    document.getElementById('promoActivatedImg5').style.display = 'none';
    document.getElementById('promo1Activada').style.display = 'none';
}

function cleanPromoColor(promocion,footer) {
    const classListPromo = promocion.className.split(' ');
    const classListFooter = footer.className.split(' ');

    const colorClassPromoIndex = classListPromo.length - 1;
    const colorClassFooterIndex = classListFooter.length - 1;

    const colorClassPromo = classListPromo[colorClassPromoIndex];
    const colorClassFooter = classListFooter[colorClassFooterIndex];

    if (colorClassPromo.search('background') !== -1) {
        promocion.classList.remove(colorClassPromo);
    }

    if (colorClassFooter.search('background') !== -1) {
        footer.classList.remove(colorClassFooter);
    }
}

function setPromociones(promos) {
    cleanPromociones();
    document.getElementById('promociones').style.display = 'inline';
    promos.forEach( ( promo, i ) => {
    if (i >= 5) {
        return ;
    }
    var index = i + 1;
    var promocion = document.getElementById(`promo${index}`);
    var footer = document.getElementById(`footer${index}`);
    cleanPromoColor(promocion, footer);
    promocion.style.display = 'flex';
    setLabel(promocion, 'promo', footer);
    footer.style.display = 'flex';
    var promoName = document.getElementById(`promoTitle${index}`);
    var promoPrice = document.getElementById(`promoPrice${index}`);
    var receive1 = document.getElementById(`receive1-${index}`);
    var receive2 = document.getElementById(`receive2-${index}`);
    var receive3 = document.getElementById(`receive3-${index}`);
    var moneyNeeded = document.getElementById(`moneyNeeded${index}`);
    promocion.classList.add(`backgroundImage${promo[4]}`);
    footer.classList.add(`backgroundImage${promo[4]}`);
    promoName.innerHTML = `${promo[0]}`;
    promoPrice.innerHTML = `${promo[1]}`;
    receive1.innerHTML = `${promo[2][0]}`;
    receive2.innerHTML = `${promo[2][1]}`;
    receive3.innerHTML = `${promo[2][2]}`;
    moneyNeeded.innerHTML = `${promo[3]}`;
    if ( promo[3] === "0" || promo[3] === "$0" ) {
        footer.style.display = 'none';
        document.getElementById(`promo${index}Activada`).style.display = 'inline';
        var img = document.getElementById(`promoActivatedImg${index}`);
        img.src = `./assets/promo${promo[4]}-activada.png`;
        var src = document.getElementById(`promo${index}Activada`);
        src.appendChild(img);
        img.style.display = 'flex';
    };
});
}

var nextPage = "standBy"

function toSetup(){
    nextPage = "setup"
    return "ok"
}

var i = 0;
function fillProgressBar(t){
    if (i == 0){
        i=1;
        var bar = document.getElementById("progressBarFill");
        var width = 1;
        let time = t * 10
        var id = setInterval(frame, time);
        function frame() {
            if (width >= 100) {
              clearInterval(id);
              i = 0;
              setTimeout(function() { bar.parentElement.style.display="none" }, 3200);
              if(nextPage == "standBy"){ pywebview.api.timeOutSetup(); }
              
            } else {
              width++;
              bar.style.width = width + "%";
            }
          }
    }
}

function ValidateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true)  
    } 
    return (false)  
  } 

function ValidateWifi(str){
    if (/^[a-z0-9]+$/i.test(str) && str != "") {  
        return (true)  
      } 
      return (false)  
    }
    
var has_load = false
function saveSetup(e){
    if(has_load){
    let masterIpInput = document.getElementById("ipMasterInput")
    let ssidInput = document.getElementById("ssidInput");
    let passwordInput = document.getElementById("passwordInput");

    let masterIp = masterIpInput.value;
    let ssid = ssidInput.value;
    let password = passwordInput.value;
    var is_valid = true;

    if(ValidateIPaddress(masterIp)){
        console.log("valid IP Adress")
        masterIpInput.classList.remove("error")
    } else {
        console.log("invalid IP Adress")
        masterIpInput.classList.add("error")
        is_valid = false;
    }
    if(ValidateWifi(ssid)){
        console.log("valid Ssid")
        ssidInput.classList.remove("error")
    } else {
        console.log("Invalid Ssid")
        ssidInput.classList.add("error")
        is_valid = false;
    }
    if(ValidateWifi(password)){
        console.log("valid Pass")
        passwordInput.classList.remove("error")
    } else {
        console.log("Invalid Pass")
        passwordInput.classList.add("error")
        is_valid = false;
    }

    let invalidTag = document.getElementById("invalidTag")
    if(!is_valid){
        console.log("Invalid fields")
        invalidTag.style.display = "block"
        return
    }
    invalidTag.style.display = "none"
    let vertical = document.getElementById("radio-vertical").checked;
    let horizontal = document.getElementById("radio-horizontal").checked;

    let orientation = horizontal ? "inverted" : "right"; 

    let setup = {
        ip_master : masterIp,
        wifi: {
            ssid: ssid,
            password: password
        },
        orientation: orientation
    }

    //console.log(setup);
    pywebview.api.saveSetup(setup);
}
}

function cancelSetup(e){
    e.preventDefault();
    pywebview.api.cancelSetup();
}

let strSetup = `
    {"ip_master": "ipmaster",
     "wifi": {"ssid": "ssid", "password": "password"},
     "orientation": "inverted"}
`

function chargeSetup(setup){

    data = JSON.parse(setup);

    firstFocus = document.getElementById("ipMasterInput");
    firstFocus.value = data.ip_master;
    document.getElementById("ssidInput").value = data.wifi.ssid;
    document.getElementById("passwordInput").value = data.wifi.password;


    let verticalRadio = document.getElementById("radio-vertical");
    let horizontalRadio = document.getElementById("radio-horizontal");

    if(data.orientation == "inverted"){
        horizontalRadio.checked = true;
    } else {
        verticalRadio.checked = true;
    }
    setTimeout(function() { has_load = true; }, 3000);
    }

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
            isEnter = (evt.key === "enter" || evt.key === "Enter");
            if(!/^[a-z0-9]+$/i.test(evt.key) && evt.key != "." && !isEnter && !isEscape){
                evt.preventDefault()
            }
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            pywebview.api.cancelSetup();
        }
        if (isEnter) {
            //saveSetup();
        }
        if (evt.key == "Tab"){
            if (document.activeElement == document.getElementById("radio-horizontal") || document.activeElement == document.getElementById("radio-vertical")){
                evt.preventDefault()
                document.getElementById("ipMasterInput").focus();
            }
        }
    };

function colorRotate(angle){
    var back = document.getElementById("backgroundImage");
    back.style.filter = "hue-rotate(" + angle + "deg)";
}

function radioFocus(tag){
    document.getElementById(tag).style.color = "lime";
}
function radioFocusOut(tag){
    document.getElementById(tag).style.color = "white";
}
function setupSubmit(e){
    e.preventDefault()
    saveSetup();
}
