"use strict";
class CircleIttenView {
  constructor(circleIttenModel) {
    this.circleIttenModel = circleIttenModel;
    this.widthFieldSVG_500 = 500;
    this.heightFieldSVG_500 = 500;
    this.widthFieldSVG_300 = 300;
    this.heightFieldSVG_300 = 300;
    this.elemsNoClassOpacityArr = [];
    this.elemsNoClassOpacityArrLeft = [];
    this.elemsNoClassOpacityArrRight = [];
    this.numberCell = null;
    this.degStart_0 = 0;
    this.degRotate_30 = 30;
    this.CELL_FORM = "M80.1,72.9l21.5,89c13.9-3.4,28.5-3,42.3,1l25.8-87.8C140.6,66.6,109.6,65.8,80.1,72.9z";
    this.CELL_TRANSFORM_ORIGIN = "120px 245px";
    this.NSSVG = "http://www.w3.org/2000/svg";
    this.arrColors = ["red", "orangered", "orange", "gold", "yellow", "greenyellow", "green", "teal", "blue", "blueviolet", "violet", "mediumvioletred"];
    this.svgField = null;
    this.cellCircleItten = null;
  }
  /////////////////////////////////////////////////////////////////
  //СОЗДАНИЕ КРУГА ИТТЕНА
  //создаём ячейку круга Иттена
  createCell(color) {
    let cell = this.createElemSVG("path");
    cell.setAttribute("d", this.CELL_FORM);
    cell.setAttribute("fill", color);
    return cell;
  }
  //создания svg элемента
  createElemSVG(name) {
    return document.createElementNS(this.NSSVG, name);
  }
  //создание круга Иттена
   createCircleItten(translate, scale) {
    let deg = this.degStart_0;
    for (let i = 0; i < this.arrColors.length; i++) {
      let cell = this.createCell(this.arrColors[i]);
      cell.classList.add("cellCircleItten");
      cell.classList.add(this.arrColors[i]);
      cell.style.transformOrigin =  this.CELL_TRANSFORM_ORIGIN;
      cell.style.transform =  translate + " rotate(" + deg + "deg)" + scale ;
      this.svgField.append(cell);
      deg = deg + this.degRotate_30;
    }
   }
   //создание SVG поля
   createFieldSVG(widthFieldSVG, heightFieldSVG, container) {
    this.svgField = this.createElemSVG("svg");
    this.svgField.setAttribute("width", widthFieldSVG + "");
    this.svgField.setAttribute("height", heightFieldSVG + "");
    this.svgField.setAttribute("xmlns", this.NSSVG);
    this.svgField.classList.add("svgField");
    this.svgField.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    container.prepend(this.svgField);
  }
  //объявление на странице
  showCircleItten() {
    let container = document.querySelector("#divContainerCircleItten");
    this.createFieldSVG(this.widthFieldSVG_500, this.heightFieldSVG_500, container);
    this.createCircleItten("translate(25%, 0)", "scale(1, 1)");
    this.cellCircleItten = document.querySelectorAll(".cellCircleItten");
    this.circleIttenModel.myEvent();
  }
  //метод для адаптивной верстки
  changeCircleIttenSizeWindow() {
     if (document.documentElement.clientWidth <= 900) {
      this.svgField.setAttribute("width", this.widthFieldSVG_300 + "");
      this.svgField.setAttribute("height", this.heightFieldSVG_300 + "");
      let deg = this.degStart_0;
      for (let i = 0; i < this.cellCircleItten.length; i++) {
        this.cellCircleItten[i].style.transform = "translate(10%, -30%) scale(0.8, 0.8) rotate(" + deg + "deg)";
        deg = deg + this.degRotate_30;
      }
     } else {
       if (this.svgField === null) {
         return;
       }
        this.svgField.setAttribute("width", this.widthFieldSVG_500 + "");
        this.svgField.setAttribute("height", this.heightFieldSVG_500 + "");
        let deg = this.degStart_0;
        for (let i = 0; i < this.cellCircleItten.length; i++) {
        this.cellCircleItten[i].style.transform = "translate(25%, 0%) scale(1, 1) rotate(" + deg + "deg)";
        deg = deg + this.degRotate_30;
      }
     }
  }
  //////////////////////////////////////////////////////////////////////////////
  // ЦВЕТОВЫЕ ГАРМОНИИ
  //показываем кнопки цветовых гармоний при нажатии
  clickColorHarmony() {
    let arrColorHarmony = document.querySelectorAll(".openOrCloseContainerColorsHarmony");
    for (let i = 0, len = arrColorHarmony.length; i < len; i++) {
      arrColorHarmony[i].onclick = function(e) {
        e = e || window.e;
        let nextElem = e.target.nextSibling.nextSibling;
        nextElem.style.transition = "all 1.5s ease";
        if (nextElem.classList.contains("closeElem")) {
          nextElem.classList.remove("closeElem");
          return;
        } else {
          nextElem.style.transition = "";
          nextElem.classList.add("closeElem");
          return;
        }
      }
    }
  }
 //////////////////////////////////////////////////////////////////////
 //ПЕРВИЧНЫЕ, ВТОРИЧНЫЕ, ТРЕТИЧНЫЕ ЦВЕТА
 //обработка кликов на кнопки первичных, вторичных и третичных цветов
  clickPrimaryColorBtnAndOther() {
     let primaryColors = document.querySelector("#primaryColors");
     let secondaryColors = document.querySelector("#secondaryColors");
     let tertiaryColors = document.querySelector("#tertiaryColors");

    primaryColors.onclick = this.funcPrimaryColors.bind(this);
    secondaryColors.onclick = this.funcSecondaryColors.bind(this);
    tertiaryColors.onclick = this.funcTertiaryColors.bind(this);
  }
  //метод обработки первичных цветов
  funcPrimaryColors(e) {
    this.getInfoAboutCircleItten(e);
    this.rotationCircleItten(e);
    for (let i = 0; i < this.cellCircleItten.length; i++) {
      this.cellCircleItten[i].classList.remove("classOpacity", "cellBorder");
      if (this.cellCircleItten[i].classList.contains("red") === true 
          || this.cellCircleItten[i].classList.contains("yellow") === true
          || this.cellCircleItten[i].classList.contains("blue") === true) {
              this.cellCircleItten[i].classList.add("cellBorder");
              continue;
      } else {
         this.cellCircleItten[i].classList.add("classOpacity");
      }
    }
  }
  //метод обработки вторичных цветов
  funcSecondaryColors(e) {
    this.getInfoAboutCircleItten(e);
    this.rotationCircleItten(e);
     for (let i = 0; i < this.cellCircleItten.length; i++) {
      this.cellCircleItten[i].classList.remove("classOpacity", "cellBorder");
      if (this.cellCircleItten[i].classList.contains("orange") === true 
          || this.cellCircleItten[i].classList.contains("green") === true
          || this.cellCircleItten[i].classList.contains("violet") === true) {
              this.cellCircleItten[i].classList.add("cellBorder");
              continue;
      } else {
         this.cellCircleItten[i].classList.add("classOpacity");
      }
    }
  }
  //метод обработки третичных цветов
   funcTertiaryColors(e) {
    this.getInfoAboutCircleItten(e);
    this.rotationCircleItten(e);
    for (let i = 0; i < this.cellCircleItten.length; i++) {
      this.cellCircleItten[i].classList.remove("classOpacity", "cellBorder");
      if (this.cellCircleItten[i].classList.contains("orangered") === true 
          || this.cellCircleItten[i].classList.contains("gold") === true
          || this.cellCircleItten[i].classList.contains("greenyellow") === true
          || this.cellCircleItten[i].classList.contains("teal") === true
          || this.cellCircleItten[i].classList.contains("blueviolet") === true
          || this.cellCircleItten[i].classList.contains("mediumvioletred") === true) {
             this.cellCircleItten[i].classList.add("cellBorder");
             continue;
      } else {
         this.cellCircleItten[i].classList.add("classOpacity");
      }
    }
  }
  ///////////////////////////////////////////////////////////////////////////
  //ВЕРНУТЬ КРУГ ИТТЕНА
  cleanCircleItten() {
    let self = this;
    let btnOriginCircleItten = document.querySelector("#btnOriginCircleItten");
    btnOriginCircleItten.onclick = function(e) {
        for (let i = 0; i < self.cellCircleItten.length; i++) {
        self.cellCircleItten[i].classList.remove("classOpacity", "cellBorder"); 
        self.setContainerInfoAboutCircleItten("");
        let containerInfoAboutCircleItten = document.querySelector("#containerInfoAboutCircleItten");
        containerInfoAboutCircleItten.style.display = "none";
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////
  //ВРАЩЕНИЕ КРУГА ИТТЕНА
   //colorsArr - массив состоящий из номеров цветов цветового круга, зависит от цветовой гармонии
  clickBtnsColorsHarmony() {
    let self = this;
    //2 цвета
    let complementaryColorsHarmony = document.querySelector("#complementaryColorsHarmony");
    complementaryColorsHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 6]);

    let adjancentColorsHarmony = document.querySelector("#adjancentColorsHarmony");
    adjancentColorsHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 1]);

    let similiarColorsHarmony = document.querySelector("#similiarColorsHarmony");
    similiarColorsHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 2]);

    let intermediateColorsHarmony = document.querySelector("#intermediateColorsHarmony");
    intermediateColorsHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 3]);

    let incompatibleColorsHarmony = document.querySelector("#incompatibleColorsHarmony");
    incompatibleColorsHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 5]);

    //3 цвета
    let threeColorsThreeColorsHarmony = document.querySelector("#threeColorsThreeColorsHarmony");
    threeColorsThreeColorsHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 4, 8]);

    let threeColorsSharedHarmony = document.querySelector("#threeColorsSharedHarmony");
    threeColorsSharedHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 5, 7]);

    //4 цвета
    let fourColorsFourColorsHarmony = document.querySelector("#fourColorsFourColorsHarmony");
    fourColorsFourColorsHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 3, 6, 9]);

    let fourColorsRectangularHarmony = document.querySelector("#fourColorsRectangularHarmony");
    fourColorsRectangularHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 2, 6, 8]);

    let fourColorsAnalogHarmony = document.querySelector("#fourColorsAnalogHarmony");
    fourColorsAnalogHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 1, 2, 3]);

    let fourColorsAlternativeHarmony = document.querySelector("#fourColorsAlternativeHarmony");
    fourColorsAlternativeHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 5, 6, 7]);

    //6 цветов
    let sixColorsSixColorsHarmony = document.querySelector("#sixColorsSixColorsHarmony");
    sixColorsSixColorsHarmony.onclick = (e) => self.clickBtnColorsHarmony(e, [0, 2, 4, 6, 8, 10]);

  }
  //обработка цветовых гармоний
  clickBtnColorsHarmony(e, colorsArr) {
    this.getInfoAboutCircleItten(e);
    this.addOpacity();
 
    for (let i = 0; i < colorsArr.length; i++) {
      this.cellCircleItten[colorsArr[i]].classList.add("cellBorder");
      this.cellCircleItten[colorsArr[i]].classList.remove("classOpacity");
    }
    //вращение круга Иттена
    this.rotationCircleItten(e);
  }
  //метод для очистки от не нужных классов и добавления класса прозрачности
  addOpacity() {
    for (let i = 0; i < this.cellCircleItten.length; i++) {
      this.cellCircleItten[i].classList.remove("classOpacity", "cellBorder");
      this.cellCircleItten[i].classList.add("classOpacity");
    }
  }
  //метод для поиска элементов не содержащих "classOpacity" и элементов рядом с ними
  searchElemNoClassOpacity() {
    this.elemsNoClassOpacityArr = [];
    this.elemsNoClassOpacityArrLeft = [];
    this.elemsNoClassOpacityArrRight = [];
    for (let i = 0; i < this.cellCircleItten.length; i++) {
      if (!this.cellCircleItten[i].classList.contains("classOpacity")) {
      
        this.elemsNoClassOpacityArr.push(this.cellCircleItten[i]);
        
        if ( i === 11 ) {
          this.elemsNoClassOpacityArrLeft.push(this.cellCircleItten[0]);
        } else {
          this.elemsNoClassOpacityArrLeft.push(this.cellCircleItten[i + 1]);
        }

        if ( i === 0 ) {
          this.elemsNoClassOpacityArrRight.push(this.cellCircleItten[11]);
        } else {
          this.elemsNoClassOpacityArrRight.push(this.cellCircleItten[i - 1]);
        }
        
      }
    }
  }
  //метод для вращения круга Иттена взависимости от цветовой гармонии
  rotationCircleItten(event) {
    let self = this;
     if (event.target.parentNode.classList.contains("colorsHarmony")) {
      //сохраняем номер ячейки с которой ушёл курсор мыши
      for (let k = 0; k < self.cellCircleItten.length; k++) {
        self.cellCircleItten[k].onmouseleave = function(e) {
          if (!self.cellCircleItten[k].classList.contains("classOpacity")) {
            self.numberCell = k; //номер ячейки
          }
        } ;
        //осуществляем вращение сменой класса "classOpacity"
        self.cellCircleItten[k].onmouseenter= function(e) {
          if (self.cellCircleItten[k].classList.contains("classOpacity")) {
            // difference - проверка, что мышь переместилась от ячейки, которая не содержит "classOpacity", к той ячейки которая содержит "classOpacity" 
            let difference = self.numberCell - k;
            difference =  Math.abs(difference);
          if (difference === 1 || difference === 11) { // 1 и 11 это разница между ячейками
              self.searchElemNoClassOpacity();//ищем элементы, которые не содержат класс "classOpacity" и сохраняем в массивы
            //элементы, которые не содержали класс "classOpacity" мы добавляем этот класс
            for (let j = 0; j < self.elemsNoClassOpacityArr.length; j++) {
              self.elemsNoClassOpacityArr[j].classList.add("classOpacity");
              self.elemsNoClassOpacityArr[j].classList.remove("cellBorder");
            }
      
            if ( ((self.numberCell < k)  &&  !((self.numberCell == 0) && (k == 11))) || ((self.numberCell === 11) && (k === 0))) {
              //а элементы, которые находятся по левую сторону, от тех элементов, которые не содержат класс "classOpacity", мы этот класс у них удаляем
              for (let j = 0;  j < self.elemsNoClassOpacityArrLeft.length; j++)  {
                self.elemsNoClassOpacityArrLeft[j].classList.add("cellBorder");
                self.elemsNoClassOpacityArrLeft[j].classList.remove("classOpacity");
              }
            } else if ((self.numberCell > k) || ((self.numberCell === 0) && (k === 11))) {
              //а элементы, которые находятся по правую сторону, от тех элементов, которые не содержат класс "classOpacity", мы этот класс у них удаляем
              for (let j = 0;  j < self.elemsNoClassOpacityArrRight.length; j++)  {
                self.elemsNoClassOpacityArrRight[j].classList.add("cellBorder");
                self.elemsNoClassOpacityArrRight[j].classList.remove("classOpacity");
              }
            }
          }
        }
      };
    }
  } else {
    for (let k = 0; k < self.cellCircleItten.length; k++) {
        self.cellCircleItten[k].onmouseleave = function(e) {
          e.preventDefault();
      };
      //осуществляем вращение сменой класса "classOpacity"
        self.cellCircleItten[k].onmouseenter = function(e) {
            e.preventDefault();
      };
  }
  }
} 
//метод, который выводит информацию о круге Иттена
  getInfoAboutCircleItten(e) {
   let info = {
     "primaryColors": "Первичные цвета — это цвета, из которых можно получить другие, путем смешения между собой, но их невозможно получить из других цветов. Если говорить о цветовом круге, то первичными цветами будут красный, синий и желтый.",
     "secondaryColors": "Вторичные цвета получаются путем смешения первичных. Из трех первичных цветов можно получить три вторичных: желтый + красный = оранжевый, желтый + синий = зеленый, красный + синий = фиолетовый.",
     "tertiaryColors": "Третичные цвета получаются, соответственно, путем смешения первичного и вторичного цветов. Таких цветов можно получить уже шесть и называться они будут соответственно исходным цветам, например, сине-фиолетовый, красно-фиолетовый, красно-оранжевый или сине-зеленый.",
     "complementaryColorsHarmony": "Комплементарные цвета — расположены друг напротив друга в круге.",
     "adjancentColorsHarmony": "Смежные цвета — расположены рядом в цветовом круге.",
     "similiarColorsHarmony": "Похожие цвета — расположены через один цвет друг от друга.",
     "intermediateColorsHarmony": "Промежуточные цвета — расположены под прямым углом друг к другу в цветовом круге.",
     "incompatibleColorsHarmony": "Несовместимые цвета — второй цвет расположен рядом с дополнительным к первому цветом.",
     "threeColorsThreeColorsHarmony": "3-цветная гармония — цвета расположены на вершинах равностороннего треугольника, вписанного в цветовой круг.",
     "threeColorsSharedHarmony": "Разделенная гармония — выбирается первый основной цвет, после чего к нему подбираются еще два цвета, близкие к его дополнительному (то есть противоположному в круге).",
     "fourColorsFourColorsHarmony": "4-цветная гармония — цвета расположены на вершинах квадрата, вписанного в цветовой круг.",
     "fourColorsRectangularHarmony": "Прямоугольная гармония — цвета расположены на вершинах прямоугольника, вписанного в круг.",
     "fourColorsAnalogHarmony": "Аналоговая гармония — все четыре цвета расположены рядом в цветовом круге.",
     "fourColorsAlternativeHarmony": "Альтернативная гармония — дополнительная гармония, дополненная двумя цветами, близкими к одному из противоположных.",
     "sixColorsSixColorsHarmony": "6-цветная гармония — цвета расположены на вершинах шестиугольника, вписанного в цветовой круг.",
   }
   let elem = e.target.getAttribute("id");
   this.setContainerInfoAboutCircleItten(info[elem]);
  }
  //установка данных в containerInfoAboutCircleItten
  setContainerInfoAboutCircleItten(info) {
    let containerInfoAboutCircleItten = document.querySelector("#containerInfoAboutCircleItten");
    containerInfoAboutCircleItten.style.display = "inline-block";
    containerInfoAboutCircleItten.innerHTML = info;
  }

}