import $ from "jquery";
import Heart from "../img/heart.png";
import "../style/style.sass";

let PopupSize = 0;
let CellSize = 0;
let BodyHeight = 0;
let BodyWidth = 0;
let SmallestViewportUnit = "vh";

export {PopupSize, CellSize, BodyHeight, BodyWidth, SmallestViewportUnit};

$(window).resize(() => $(window).trigger("window:resize:pre"));

$(window).on("window:resize:pre", () => {
    updateGlobalVars();
    $(window).trigger("window:resize");
});


let completelyLoaded = false;
$(window).on("window:resize", () => {
    if (!completelyLoaded) {
        completelyLoaded = true;
        setTimeout(() => {
            document.getElementById("hideAll").style.display = "none";
            console.log("visible now!");
        }, 0);
    }
});

$(window).ready(() => {
    $("footer img").attr("src", Heart);
    console.log("Set heart image!")
});

$(window).on("load", () => {
    $('img').on('dragstart', event => event.preventDefault());
    $(window).trigger("window:resize:pre");
});

function updateGlobalVars() {
    let body = $("body");
    BodyWidth = body.width();
    BodyHeight = body.height();
    PopupSize = getPopupSize(BodyWidth);
    CellSize = PopupSize / 3;
    SmallestViewportUnit = BodyHeight < BodyWidth ? 'vh' : 'vw';
}

function getPopupSize(width) {
    let minIn = 400;
    let maxIn = 800;
    let maxOut = 50;
    let minOut = 80;
    let value = Math.min(Math.max(width, minIn), maxIn);
    return (value - minIn) * (maxOut - minOut) / (maxIn - minIn) + minOut;
}