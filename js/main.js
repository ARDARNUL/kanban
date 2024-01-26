let eventBus = new Vue()

window.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("p1");
    element.addEventListener("dragstart", dragstart_handler);
});


Vue.component("kanban", {
    template: `
<div class="kanban">

<form class="form">
        <div id="createcard">

          <div>
              <p>Название карточки:</p>
              <input type="text" placeholder="Название" v-model="title" maxlength="15">
          </div>

          <div>
          <p>Описание задачи:</p>
          <input type="text" placeholder="Описание" v-model="desc" maxlength="60">
          </div>

          <div>
          <input type="date" id="start" name="start" v-model="deadlin"

          min="2023-01-01" max="2030-12-31">
          <div>
            
        <label for="priority">priority:</label>
            <select id="priority" v-model.number="priority">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
          </div>
          </div>
          
      </div>
      <p>Время дедлайна</p>
      <input type="submit" @click.prevent="CreateCard" value="Создать карточку"> 
      </form>  

<ul class="columns">

<li class="column"   @drop="Test($event, 1)"
@dragover.prevent
@dragenter.prevent >
    <h3>Запланированные задачи</h3>
    <ul>
        <li v-for="card in column1">
            <card @deletethis="Delete" @moveright="MoveR" @edit="EditCard" :last_red="card.last_red" :column=1 :id="card.id" :title="card.title" :priority="card.priority" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul>
</li>

<li class="column" @drop="Test($event, 2)" @dragover.prevent
@dragenter.prevent>
    <h3>Задачи в работе</h3>
    <ul>
        <li v-for="card in column2">
            <card @deletethis="Delete" @moveright="MoveR" @edit="EditCard" :reasons="card.reasons"  :last_red="card.last_red" :column=2 :id="card.id" :title="card.title" :priority="card.priority" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul>
</li>

<li class="column" @drop="Test($event, 3)" @dragover.prevent
@dragenter.prevent>
    <h3>Тестирование</h3> 
    <ul>
        <li v-for="card in column3">
            <card @deletethis="Delete" @moveleft="MoveL" @edit="EditCard" :reasons="card.reasons"  :last_red="card.last_red" @moveright="MoveR" :column=3 :id="card.id" :title="card.title" :priority="card.priority" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul> 
</li>

<li class="column" @drop="Test($event, 4)" @dragover.prevent
@dragenter.prevent>
    <h3>Выполненные задачи</h3>  
    <ul>
        <li v-for="card in column4">
            <card @deletethis="Delete" @moveleft="MoveL" @edit="EditCard" :result="card.result" :reasons="card.reasons" :last_red="card.last_red" :column=4 :id="card.id" :title="card.title" :priority="card.priority" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul>
</li>

</ul>
</div>
    `,
    data() {
        return{
            log:0,
            column1:[],
            column2:[],
            column3:[],
            column4:[],
            columnx:[],
            allColumns:[],

            priority:null,
            id:0,
            title:null,
            desc:null,

            reason:null,
            last_red:null,

            year:null,
            month:null,
            day:null,
            deadlin:null,
            deadline:[],
            result:null
        }
    },
    methods: {
        CreateCard(){
            if(this.title&&this.desc&&this.deadlin&&this.priority){
                this.deadline=[]
                this.year = this.deadlin[0] + this.deadlin[1] + this.deadlin[2] + this.deadlin[3]
                this.month = this.deadlin[5] + this.deadlin[6]
                this.day= this.deadlin[8] + this.deadlin[9]
                
                this.deadline.push({day:this.day, month:this.month, year:this.year})
                let createtime = new Date()
                info ={
                    id:this.id,
                    title:this.title,
                    desc:this.desc,
                    deadline:this.deadline,
                    createtime:String(createtime),
                    edit:false,
                    last_red:"",
                    reasons:[],
                    result:null,
                    priority:this.priority
                }
                console.log(this.priority);
                this.id+=1
                this.column1.push(info)
            }
        },
        Delete(id){
            for(let i = 0; i < this.column1.length; i++){
                if(this.column1[i].id==id){
                      this.column1.splice(i, 1)
            }}
            for(let i = 0; i < this.column2.length; i++){
                if(this.column2[i].id==id){
                      this.column2.splice(i, 1)
            }}
            for(let i = 0; i < this.column3.length; i++){
                if(this.column3[i].id==id){
                    this.column3.splice(i, 1)
            }}
            for(let i = 0; i < this.column4.length; i++){
                if(this.column4[i].id==id){
                    this.column4.splice(i, 1)
            }}
        },
        MoveL(id,col,reason){
            if(col==2){
                for(let i = 0; i < this.column2.length; i++){
                    if(this.column2[i].id==id){
                        this.column1.sort((a, b) => b.priority - a.priority);
                        this.column1.push(this.column2[i])
                        this.column2.splice(i, 1)
                }}
            }

            if(col==3){
                for(let i = 0; i < this.column3.length; i++){
                    if(this.column3[i].id==id){
                        this.column3[i].reasons.push(reason)    
                        this.column2.push(this.column3[i])
                        this.column3.splice(i, 1)
                }}
            }
            if(col==4){
                for(let i = 0; i < this.column4.length; i++){
                    if(this.column4[i].id==id){
                        this.column4[i].reasons.push(reason)    
                        this.column3.push(this.column4[i])
                        this.column4.splice(i, 1)
                }}
            }
        },
        MoveR(id,col){
            if(col==1){
                for(let i = 0; i < this.column1.length; i++){
                    if(this.column1[i].id==id){
                        this.column1.sort((function (a, b) {  return a - b;  })) 
                        this.column2.push(this.column1[i])
                        this.column1.splice(i, 1)
                }}
            }
            else if(col==2){
                for(let i = 0; i < this.column2.length; i++){
                    if(this.column2[i].id==id){
                        this.column2.sort((function (a, b) {  return a - b;  })) 
                        this.column3.push(this.column2[i])
                        this.column2.splice(i, 1)
                }}
            }
            else if(col==3){
                for(let i = 0; i < this.column3.length; i++){
                    if(this.column3[i].id==id){
                        const item = this.column3[i].deadline[0]

                        let current_date = new Date()
                        const year = current_date.getFullYear()
                        const month = current_date.getMonth() +1
                        const day = current_date.getDate()
                        
                        
                        if (Number(item.year) < year || (Number(item.month) <= month) && Number(item.day) < day) {
                            this.column3[i].result="fail"
                        } else {
                            this.column3[i].result="success"
                        }
                        console.log(this.column3)
                        this.column4.push(this.column3[i])
                        this.column3=this.column3.sort((function (a, b) {  return a - b;  })) 
                        this.column3.splice(i, 1)
                }
            }
            }
        },


        Test(evt,ncolumn){
            const itemID = evt.dataTransfer.getData('oid')
            const column = evt.dataTransfer.getData('column')
            const reas = evt.dataTransfer.getData('reas')

            if(column==1&&ncolumn==2){
                this.MoveR(itemID,column)
            }
            else if(column==2&&ncolumn==3){
                this.MoveR(itemID,column)                
            }
            else if(column==3&&ncolumn==4){
                this.MoveR(itemID,column)                
            }
            if(column==3&&ncolumn==2&&reas!="null"){
                this.MoveL(itemID,column,reas)
            }
            if(column==2&&ncolumn==1){
                this.MoveL(itemID,column,reas)
            }
        },



        EditCard(id,titlenew,descnew,deadlinenew,prioritynew){
            this.log+=1
            for(let i = 0; i < this.column1.length; i++){
                if(this.column1[i].id==id){
                    this.deadlin = deadlinenew
                    this.year = this.deadlin[0] + this.deadlin[1] + this.deadlin[2] + this.deadlin[3]
                    this.month = this.deadlin[5] + this.deadlin[6]
                    this.day= this.deadlin[8] + this.deadlin[9]
                    this.deadline = []
                    this.deadline.push({day:this.day, month:this.month, year:this.year})
                    let last_red = new Date()

                    this.column1[i].title=titlenew,
                    this.column1[i].priority = prioritynew
                    this.column1[i].desc=descnew,
                    this.column1[i].deadline=this.deadline
                    this.column1[i].last_red=String(last_red)
            }}
            for(let i = 0; i < this.column2.length; i++){
                if(this.column2[i].id==id){
                    this.deadlin = deadlinenew
                    this.year = this.deadlin[0] + this.deadlin[1] + this.deadlin[2] + this.deadlin[3]
                    this.month = this.deadlin[5] + this.deadlin[6]
                    this.day= this.deadlin[8] + this.deadlin[9]
                    this.deadline = []
                    this.deadline.push({day:this.day, month:this.month, year:this.year})
                    let last_red = new Date()

                    this.column2[i].title=titlenew,
                    this.column2[i].priority = prioritynew
                    this.column2[i].desc=descnew,
                    this.column2[i].deadline=this.deadline
                    this.column2[i].last_red=String(last_red)
            }}
            for(let i = 0; i < this.column3.length; i++){
                if(this.column3[i].id==id){
                    this.deadlin = deadlinenew
                    this.year = this.deadlin[0] + this.deadlin[1] + this.deadlin[2] + this.deadlin[3]
                    this.month = this.deadlin[5] + this.deadlin[6]
                    this.day= this.deadlin[8] + this.deadlin[9]
                    this.deadline = []
                    this.deadline.push({day:this.day, month:this.month, year:this.year})
                    let last_red = new Date()

                    this.column3[i].title=titlenew,
                    this.column3[i].priority = prioritynew
                    this.column3[i].desc=descnew,
                    this.column3[i].deadline=this.deadline
                    this.column3[i].last_red=String(last_red)
            }}
        }
    },
    mounted(){
        if (localStorage.getItem('allColumns')) {
            try {
                this.allColumns = JSON.parse(localStorage.getItem('allColumns'));
                this.column1 = this.allColumns[0]
                this.column2 = this.allColumns[1]
                this.column3 = this.allColumns[2]
                this.column4 = this.allColumns[3]
                this.id = this.allColumns[4]
            } catch(e) {
                localStorage.removeItem('allColumns');
            }
        }
    },
    watch:{
        column1(){
            this.allColumns = [this.column1,this.column2,this.column3, this.column4,this.id]
            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);
        },
        column2(){
            allColumns = [this.column1, this.column2, this.column3, this.column4,this.id]
            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);
        },
        column3(){
            allColumns = [this.column1, this.column2, this.column3, this.column4,this.id]             
            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);
        },
        column4(){
            allColumns = [this.column1, this.column2, this.column3, this.column4,this.id]    
            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);
      },
      log(){
        allColumns = [this.column1, this.column2, this.column3, this.column4,this.id]    
        const parsed = JSON.stringify(this.allColumns);
        localStorage.setItem('allColumns', parsed);        
      }
  }
});

Vue.component("card", {
    template: `
<div class="card" draggable="true" :key="id" @dragstart="startDrag($event, id, column, reason, result, )">
<h4>{{this.title}}</h4>
<p>Приоритет:{{this.priority}}</p>
<p v-if="result=='success'">Карточка выполнена в срок<p>
<p v-if="result=='fail'">Карточка не выполнена в срок<p>
<p>Описание: {{this.desc}}</p>
<p>Дедлайн: {{this.deadline[0].day}}.{{this.deadline[0].month}}.{{this.deadline[0].year}}</p>
<p>Дата создания:{{this.createtime}}</p>
<p v-if="last_red">Последнее редактирование: {{this.last_red}}</p>
<p v-if="reasons">Причины возврата:</p>
<ul v-for="i in reasons"> 
<li class="reason">{{i}}</li>
</ul>

<div>
<button v-on:click="deletethis">Удалить карточку</button>
<button v-if="column==1||column==2||column==3" v-on:click="editable">Редактировать</button>

<div v-if="column==3" class="sendback">
<button :disabled="!reason" v-on:click="moveleft">Переместить назад</button>
<p>Название карточки:</p>
<input type="text" placeholder="Причина возврата" v-model="reason" maxlength="40">
</div>

<button v-if="column==1||column==2||column==3" v-on:click="moveright">Переместить дальше</button>
<form v-if="edit">
<div id="redact">

<div>
    <p>Название карточки:</p>
    <input type="text" placeholder="Название" v-model="titlenew" maxlength="15">
</div>

<div>
<p>Описание задачи:</p>
<input type="text" placeholder="Описание" v-model="descnew" maxlength="60">
</div>

<div>
<input type="date" id="start" name="start" v-model="deadlinenew"

min="2023-01-01" max="2030-12-31">
<input type="submit" @click.prevent="RedCard" value="Редактировать карточку"> 
</div>
</div>
</form>
</div>
</div>
    `,
    data() {
        return{
            edit:false,
            titlenew:null,
            descnew:null,
            deadlinenew:null,
            reason:null,
            prioritynew:null,
        }
    },
    methods: {
        deletethis(){
            this.$emit("deletethis",this.id);
        },
        moveleft(){
            this.$emit("moveleft",this.id,this.column, this.reason);
        },
        moveright(){
            this.$emit("moveright",this.id,this.column);
        },
        editable(){
            this.edit=!this.edit
        },
        RedCard(){
            if(this.titlenew&&this.descnew&&this.deadlinenew&&this.prioritynew){
                this.edit=false               
                this.$emit("edit",this.id,this.titlenew,this.descnew,this.deadlinenew,this.prioritynew); 
            }  
        },
        startDrag(evt, oid, column,reason) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('oid', oid)
            evt.dataTransfer.setData('column', column)
            evt.dataTransfer.setData('reas', reason)
            console.log(this.result);
          }     
    }, 
    props:{ 
        column:{
            type:Number
        },
        id:{
            type:Number
        },
        title:{
            type:String
        },
        desc:{
            type:String
        },
        deadline:{
            type:Array
        },
        createtime:{
            type:String
        },
        last_red:{
            type:String,
        },
        reasons:{
            type:Array,
        },
        result:{
            type:String,
            required:false,
        },
        priority:{
            type: Number,
        },
    },
    computed: {
    }
});


let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {
        
    },
});