import Component from 'can-component';
import Map from 'can-map';
import template from './home.stache';
import { EHOSTUNREACH } from 'constants';
import List from 'can-define/list/list';


const HomeViewModel = Map.extend( "HomeViewModel", {
  greeting:"Welcome to Javascript Web Application Developer Applicant Coding Assignment!",
  selectedFields:[], 
  headers:[],
  fields: [{name:"Id",header:"Id"},
  
      {name:"Description",header:"Description"},
        {name:"MAC",header:"MAC"},
        {name:"SerialNumber",header:"Serial Number"},
        {name:"Platform",header:"Platform"},
        {name:"User",header:"User"},
        {name:"AssignedSignId",header:"Assigned Sign Id"},
        {name:"AssignedSignPath",header:"Assigned Sign Path"},
         {name:"Temperature",header:"Temperature"},
        {name:"MBMVersion",header:"MBM Version"},
        {name:"FirmwareVersion",header:"Firmware Version"},
        ],
  get items(){    
    return  new Promise(function(resolve) {
     
        $.getJSON("/assets/assignment.json",{},function(data){
          resolve(data);
        })
     
      
    });
    
  },
  checkIfFieldSelected:function(fieldName){
    return this.selectedFields.length && this.selectedFields.indexOf(fieldName)>-1;
  },
  showReport:function(){
    var self=this;
    var headerList=[];
    this.selectedFields.forEach(function(element, index, list) {      
      var filtered = self.fields.filter( function(item, index, list)
                      {
                          return item.name ==element;
                      }); 
    if(filtered.length){
      headerList.push(filtered[0].header)
    }
  });
  this.attr('headers', headerList);
  this.attr('items',this.items);
  this.attr('selectedFields',this.selectedFields);
  }

});




Component.extend({
  tag: 'home-page',
  view: template,
  ViewModel:HomeViewModel 
});
