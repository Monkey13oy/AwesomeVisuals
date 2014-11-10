/* ========================================================================
 * Bootstrap: awesome_visuals.src.js v0.1
 * use Font awesome to create great data visualisations
 * ========================================================================
 * Copyright 2014 Wundle.com
 * Licensed under MIT
 * ======================================================================== */


+function ($) {
  'use strict';

  // AwesomeVisuals PUBLIC CLASS DEFINITION
  // ===============================

  var AwesomeVisuals = function (type, element, options) {
    this.type = type
    this.init(type,element, options)
  }

  AwesomeVisuals.VERSION  = '0.1'


  AwesomeVisuals.PRIVATES = {
    containerWidth: 400,
    lang: {
            decimalPoint: '.',
            thousandsSep: ','
        }
  }

  //------------------------------------------------------------------------------------------------------------------------------
  // General constructor

  AwesomeVisuals.prototype.getDefaults = function () {
    return AwesomeVisuals.DEFAULTS
  }

  AwesomeVisuals.prototype.getOptions = function (options) {
    options = $.extend(true,{},this.getDefaults(),this.$element.data(), options)

    return options
  }

  AwesomeVisuals.prototype.init = function(type, element, options)
  {
    this[type].init(element,options)
  }

  AwesomeVisuals.prototype.update = function(value){

    this[this.type].update(value);

  }

  AwesomeVisuals.DEFAULTS = {
    type: 'fill'
  }

  //-------------------------------------------------------------------------------------------------------------------------------

  // fill 

  AwesomeVisuals.prototype.fill = function(){
    this.type       =
    this.options    =
    this.enabled    =
    this.$element   = 
    this.prop = null;

  }

  AwesomeVisuals.fill = {}

  AwesomeVisuals.fill.DEFAULTS = {
    fontawesomeicon: 'male',
    fillcolor: 'red',
    nonfillcolor: 'lightgrey',
    height: 400,
    fillproportion: 0.6
  }
  

  AwesomeVisuals.prototype.fill.init = function (element, options) {
    this.$element = $(element)
    this.enabled   = true
    this.type      = 'fill'
    this.options   = this.getOptions(options)

    var selectWidth = this.$element.width();

    this.options.fillproportion = Math.max(Math.min(this.options.fillproportion,1),0);

    //
    if (selectWidth == 0){
      this.$element.css("width", AwesomeVisuals.PRIVATES.containerWidth );
    }

    var wrapper = $("<div>").addClass("awesomeVisualsWrapper").addClass(this.options.filldirection).css("height", this.options.height);

    var fill = $("<div>").addClass("fill").css("color", this.options.nonfillcolor);
    var partFill = $("<div>").addClass("partFill").css("color", this.options.fillcolor);

    this.partFill = partFill;

    var fillHeight = (this.options.height - this.options.filladjustment.top - this.options.filladjustment.bottom) ;
    var partFillMarginTop = fillHeight* (1-this.options.fillproportion) + this.options.filladjustment.top;
    var partFillHeight = this.options.height - partFillMarginTop;

    if (this.options.filldirection == "up"){
       partFill.css({
        "margin-top": partFillMarginTop,
        "height": partFillHeight  
       });
     }else{
        partFill.css({
        "margin-bottom": partFillMarginTop,
        "height": partFillHeight  
       });

     }

     //create fill elements
    var fillIcon = $("<div>").addClass('iconHolder').css({
      "font-size":this.options.height}).append($("<i>").addClass('fa fa-'+ this.options.fontawesomeicon))
    var fillLabel = $("<div>").html(this.getLabel(this.options.filltext.format,this.options.fillproportion ))
    var filltext = $("<div>").addClass("filltext").css({
      "height": this.options.height,
      "color": this.options.fillcolor,
      "font-size": this.options.filltext.size,
      "margin-left": this.options.filltext.marginLeft,
      "margin-right": this.options.filltext.marginRight }).append(fillLabel)

    fill.append(fillIcon).append(filltext);

    this.labelFill = fillLabel

    //
    //create part fill elements
    var partFillIcon = $("<div>").addClass('iconHolder').css({
      "font-size":this.options.height}).append($("<i>").addClass('fa fa-'+ this.options.fontawesomeicon))
    var partFillLabel = $("<div>").html(this.getLabel(this.options.filltext.format,this.options.fillproportion ))
    var partfilltext = $("<div>").addClass("filltext").css({
      "height": this.options.height,
      "color": this.options.filltext.color,
      "font-size": this.options.filltext.size,
      "margin-left": this.options.filltext.marginLeft,
      "margin-right": this.options.filltext.marginRight}).append(partFillLabel)

    partFill.append(partFillIcon).append(partfilltext);

    this.labelPartFill = partFillLabel

    wrapper.append(fill).append(partFill);

    this.$element.append(wrapper);
  }

  AwesomeVisuals.prototype.fill.getDefaults = function () {
    return AwesomeVisuals.fill.DEFAULTS
  }

  AwesomeVisuals.prototype.fill.getOptions = function (options) {
    options = $.extend(true,{},this.getDefaults(), this.$element.data(), options)

    return options
  }

  AwesomeVisuals.prototype.fill.getLabel = function (str, val){

      var lang = AwesomeVisuals.PRIVATES.lang;
     return str.replace(/{value.percentage}/g,this.numberFormat(val*100, 0, lang.decimalPoint, lang.thousandsSep ) + "%")

  }


  AwesomeVisuals.prototype.fill.numberFormat = function (number, decimals, decPoint, thousandsSep) {
        // http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_number_format/
      var  n = number, c = decimals,
    d = decPoint === undefined ? defualtOptions.decimalPoint : decPoint,
    t = thousandsSep === undefined ? defualtOptions.thousandsSep : thousandsSep, s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(+n || 0).toFixed(c))),
    j = i.length > 3 ? i.length % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c>0 ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }

    //methods
  

  AwesomeVisuals.prototype.fill.update = function(value){

    this.options.fillproportion = Math.max(Math.min(value,1),0);

    var fillHeight = (this.options.height - this.options.filladjustment.top - this.options.filladjustment.bottom) ;
    var partFillMarginTop = fillHeight* (1-this.options.fillproportion) + this.options.filladjustment.top;
    var partFillHeight = this.options.height - partFillMarginTop;

    if (this.options.filldirection == "up"){
       this.partFill.css({
        "margin-top": partFillMarginTop,
        "height": partFillHeight  
       });
     }else{
        this.partFill.css({
        "margin-bottom": partFillMarginTop,
        "height": partFillHeight  
       });

     }

     this.labelFill.html(this.getLabel(this.options.filltext.format,this.options.fillproportion))

     this.labelPartFill.html(this.getLabel(this.options.filltext.format,this.options.fillproportion))

  }

  //-------------------------------------------------------------------------------------------------------------------------------

  // Fill 

  AwesomeVisuals.prototype.fill = function(){
    this.type       =
    this.options    =
    this.enabled    =
    this.$element   = 
    this.prop = null;

  }

  AwesomeVisuals.fill = {}

  AwesomeVisuals.fill.DEFAULTS = {
    fontawesomeicon: 'male',
    fillcolor: 'red',
    nonfillcolor: 'lightgrey',
    filltext:{
      color: 'white',
      size: '50px',
      format: '{value.percentage}',
      paddingleft: '0%',
      paddingright: '0%'
    },
    filldirection: 'up',
    filladjustment: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    height: 400,
    fillproportion: 0.6
  }


  

  AwesomeVisuals.prototype.fill.init = function (element, options) {
    this.$element = $(element)
    this.enabled   = true
    this.type      = 'fill'
    this.partFill  =
    this.labelFill =
    this.labelPartFill =
    this.options   = this.getOptions(options)

    var selectWidth = this.$element.width();

    this.options.fillproportion = Math.max(Math.min(this.options.fillproportion,1),0);

    //
    if (selectWidth == 0){
      this.$element.css("width", AwesomeVisuals.PRIVATES.containerWidth );
    }

    var wrapper = $("<div>").addClass("awesomeVisualsWrapper").addClass(this.options.filldirection).css("height", this.options.height);

    var fill = $("<div>").addClass("fill").css("color", this.options.nonfillcolor);
    var partFill = $("<div>").addClass("partFill").css("color", this.options.fillcolor);

    this.partFill = partFill;

    var fillHeight = (this.options.height - this.options.filladjustment.top - this.options.filladjustment.bottom) ;
    var partFillMarginTop = fillHeight* (1-this.options.fillproportion) + this.options.filladjustment.top;
    var partFillHeight = this.options.height - partFillMarginTop;

    if (this.options.filldirection == "up"){
       partFill.css({
        "margin-top": partFillMarginTop,
        "height": partFillHeight  
       });
     }else{
        partFill.css({
        "margin-bottom": partFillMarginTop,
        "height": partFillHeight  
       });

     }

     //create fill elements
    var fillIcon = $("<div>").addClass('iconHolder').css({
      "font-size":this.options.height}).append($("<i>").addClass('fa fa-'+ this.options.fontawesomeicon))
    var fillLabel = $("<div>").html(this.getLabel(this.options.filltext.format,this.options.fillproportion ))
    var filltext = $("<div>").addClass("filltext").css({
      "height": this.options.height,
      "color": this.options.fillcolor,
      "font-size": this.options.filltext.size,
      "margin-left": this.options.filltext.marginLeft,
      "margin-right": this.options.filltext.marginRight }).append(fillLabel)

    fill.append(fillIcon).append(filltext);

    this.labelFill = fillLabel

    //
    //create part fill elements
    var partFillIcon = $("<div>").addClass('iconHolder').css({
      "font-size":this.options.height}).append($("<i>").addClass('fa fa-'+ this.options.fontawesomeicon))
    var partFillLabel = $("<div>").html(this.getLabel(this.options.filltext.format,this.options.fillproportion ))
    var partfilltext = $("<div>").addClass("filltext").css({
      "height": this.options.height,
      "color": this.options.filltext.color,
      "font-size": this.options.filltext.size,
      "margin-left": this.options.filltext.marginLeft,
      "margin-right": this.options.filltext.marginRight}).append(partFillLabel)

    partFill.append(partFillIcon).append(partfilltext);

    this.labelPartFill = partFillLabel

    wrapper.append(fill).append(partFill);

    this.$element.append(wrapper);
  }

  AwesomeVisuals.prototype.fill.getDefaults = function () {
    return AwesomeVisuals.fill.DEFAULTS
  }

  AwesomeVisuals.prototype.fill.getOptions = function (options) {
    options = $.extend(true,{},this.getDefaults(), this.$element.data(), options)

    return options
  }

  AwesomeVisuals.prototype.fill.getLabel = function (str, val){

      var lang = AwesomeVisuals.PRIVATES.lang;
     return str.replace(/{value.percentage}/g,this.numberFormat(val*100, 0, lang.decimalPoint, lang.thousandsSep ) + "%")

  }


  AwesomeVisuals.prototype.fill.numberFormat = function (number, decimals, decPoint, thousandsSep) {
        // http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_number_format/
      var  n = number, c = decimals,
    d = decPoint === undefined ? defualtOptions.decimalPoint : decPoint,
    t = thousandsSep === undefined ? defualtOptions.thousandsSep : thousandsSep, s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(+n || 0).toFixed(c))),
    j = i.length > 3 ? i.length % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c>0 ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }

    //methods
  

  AwesomeVisuals.prototype.fill.update = function(value){

    this.options.fillproportion = Math.max(Math.min(value,1),0);

    var fillHeight = (this.options.height - this.options.filladjustment.top - this.options.filladjustment.bottom) ;
    var partFillMarginTop = fillHeight* (1-this.options.fillproportion) + this.options.filladjustment.top;
    var partFillHeight = this.options.height - partFillMarginTop;

    if (this.options.filldirection == "up"){
       this.partFill.css({
        "margin-top": partFillMarginTop,
        "height": partFillHeight  
       });
     }else{
        this.partFill.css({
        "margin-bottom": partFillMarginTop,
        "height": partFillHeight  
       });

     }

     this.labelFill.html(this.getLabel(this.options.filltext.format,this.options.fillproportion))

     this.labelPartFill.html(this.getLabel(this.options.filltext.format,this.options.fillproportion))

  }

  //-------------------------------------------------------------------------------------------------------------------------------

  // grid 

  AwesomeVisuals.prototype.grid = function(){
    this.type       =
    this.options    =
    this.enabled    =
    this.$element;

  }

  AwesomeVisuals.grid = {}

  AwesomeVisuals.grid.DEFAULTS = {
    fontawesomeicon: 'male',
    gridtotal: 100,
    fillproportion: 0.75,
    fillcolor: 'red',
    nonfillcolor: 'lightgrey',
    iconSize: 35,
    gridrows: 10,
    iconmargin: '0.1em 0.3em'
  }



  AwesomeVisuals.prototype.grid.init = function (element, options) {
    this.$element = $(element)
    this.enabled   = true
    this.type      = 'grid'
    this.gridObjects  =
    this.itemsPerRow =
    this.fillTotal =
    this.options   = this.getOptions(options)

    var selectWidth = this.$element.width();

    this.fillTotal = Math.floor(this.options.gridtotal*this.options.fillproportion);

    this.options.fillTotal = Math.max(Math.min(this.options.fillTotal,this.options.gridtotal),0);

    //
    if (selectWidth == 0){
      this.$element.css("width", AwesomeVisuals.PRIVATES.containerWidth );
    }

    this.itemsPerRow = Math.ceil(this.options.gridtotal / this.options.gridrows);

    var wrapper = $("<div>").addClass("awesomeVisualsWrapper");

    var itemC = 0;
    this.gridObjects = [];
    for (var n=0;n<this.options.gridrows; n++){
      //each row
      var row = $("<div>").addClass("iconRow");

      for (var r=0;r<this.itemsPerRow; r++){

          var icon = $("<i>").addClass('gridIcon fa fa-'+ this.options.fontawesomeicon).css({
      "font-size":this.options.iconSize,
      "margin":  this.options.iconmargin
    });

          this.gridObjects.push(icon);

          itemC++;

          if (itemC <= this.options.fillTotal){
            icon.css("color", this.options.fillcolor);

            }else{
            icon.css("color", this.options.nonfillcolor);              
            }

          row.append(icon);

      }

      wrapper.append(row);

    }

    this.$element.append(wrapper);
  }

  AwesomeVisuals.prototype.grid.getDefaults = function () {
    return AwesomeVisuals.grid.DEFAULTS
  }

  AwesomeVisuals.prototype.grid.getOptions = function (options) {
    options = $.extend(true,{},this.getDefaults(), this.$element.data(), options)

    return options
  }


  //methods

  AwesomeVisuals.prototype.grid.update = function(value){

    this.options.fillproportion = value;

    this.fillTotal = Math.floor(this.options.gridtotal*this.options.fillproportion);

    this.options.fillTotal = Math.max(Math.min(this.fillTotal,this.options.gridtotal),0);

    for (var n=0; n<this.options.gridtotal; n++){

        var icon = this.gridObjects[n];

        if (n < this.options.fillTotal){
            icon.css("color", this.options.fillcolor);

        }else{
            icon.css("color", this.options.nonfillcolor);              
        }

    }

  }


  // AwesomeVisuals PLUGIN DEFINITION
  // =========================

  function Plugin(option, methodValue) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('wun.AwesomeVisuals')
      var options = typeof option == 'object' && option
      var type = "fill"

      if (!data && option == 'destroy') return
      if (!data){
        if (options){
          if (options.type != undefined){
            type = options.type
          }
        }
        $this.data('wun.AwesomeVisuals', (data = new AwesomeVisuals(type, this, options)))
      } 
      if (typeof option == 'string') data[option](methodValue)
    })
  }

  var old = $.fn.AwesomeVisuals

  $.fn.AwesomeVisuals             = Plugin
  $.fn.AwesomeVisuals.Constructor = AwesomeVisuals


  // AwesomeVisuals NO CONFLICT
  // ===================

  $.fn.AwesomeVisuals.noConflict = function () {
    $.fn.AwesomeVisuals = old
    return this
  }

}(jQuery);
