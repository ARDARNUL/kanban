let eventBus = new Vue()

Vue.component("kanban",{
    template:`
        <div class="kanban">
        
        <button>add</button>

        <ul id="columns">
        <li class="column">
        <ul>
        <li></li>
        </ul>
        </li>

        <li class="column">
        <ul>
        <li></li>
        </ul>
        </li>

        <li class="column">
        <ul>
        <li></li>
        </ul>
        </li>

        <li class="column">
        <ul>
        <li></li>
        </ul>
        </li>
        </ul>
        </div>
        
    `,

    data(){
        return{
            column1:[],
            column2:[],
            column3:[],
            column4:[],

            saveColumns:[],
            cards:[],

            deadlin:null,
            dedline: [],

        }
    },
    mounted(){
        if (localStorage.getItem('saveColumns')) {
              try {
                this.saveColumns = JSON.parse(localStorage.getItem('saveColumns'));
                this.column1 = this.saveColumns[0]
                this.column2 = this.saveColumns[1]
                this.column3 = this.saveColumns[2]
                this.column4 = this.saveColumns[3]
              } catch(e) {
                localStorage.removeItem('saveColumns');
              }
        }
},
watch:{
    column1(){
          this.saveColumns = [this.column1,this.column2,this.column3, this.column4]
        
          const parsed = JSON.stringify(this.saveColumns);
          localStorage.setItem('saveColumns', parsed);
    },
    column2(){
          saveColumns = [this.column1, this.column2, this.column3, this.column4]

          const parsed = JSON.stringify(this.saveColumns);
          localStorage.setItem('saveColumns', parsed);
    },
    column3(){
          saveColumns = [this.column1, this.column2, this.column3, this.column4]

          const parsed = JSON.stringify(this.saveColumns);
          localStorage.setItem('saveColumns', parsed);
    },
    column4(){
        saveColumns = [this.column1, this.column2, this.column3, this.column4]

        const parsed = JSON.stringify(this.saveColumns);
        localStorage.setItem('saveColumns', parsed);
    },
    },
});

Vue.component("addCart",{
    template: `
    <div>
        <form class="form">
            <label for="name">Title</label><input type="text" id="name" v-model="name">

            <label fro="text">label</label><input type="text" id="text" v-model="text" >

            <p></p>

            <input>

            <button type="sumbit" class="but"  value="Submit">Create</button>
        <form>
    </div>
    `,
    data(){
        return{
            id: 0,
            name:null,
            text:null,
            
            year: null,
            month: null,
            day: null,

            points:[],
            
            errors:[],
        }
    },

    methods:{
        onSubmit(){
            this.errors=[]
            this.points=[]
            if(this.text){
                this.points.push([this.text,false])
            }
            
            if(!this.text){
                this.errors.push("Введите Задачу")
            }

            if(!this.name){
                this.errors.push("Не введён заголовок")
            }

            if(this.errors.length==0){
                let info = {
                    name:this.name,
                    points:this.points,
                    id:this.id,
                    count_of_checked:0,
                }
                this.id +=1;
                this.column1.push(info)
            }
        },
        toColumnOne(name,points, id,count_of_checked){
                let info = {
                    name:name,
                    points:points,
                    id:id,
                    count_of_checked:count_of_checked
                }

                for(i in this.column2){
                    
                    if(this.column2[i].id==id){
                        this.column2.splice(i, 1)
                        break
                    }
                }
                this.column1.push(info)
        },
        toColumnTwo(name,points, id,count_of_checked){
            
                let info = {
                    name:name,
                    points:points,
                    id:id,
                    count_of_checked:count_of_checked
                }
                for(i in this.column1){
                    
                    if(this.column1[i].id==id){
                        this.column1.splice(i, 1)
                        break
                    }
                }

                this.column2.push(info)
        },

        toColumnThree(name,points, id,now){
            let info = {
                name:name,
                points:points,
                id:id,
                dat:now,
            }

            for(i in this.column2){
                if(this.column2[i].id==id){
                    this.column2.splice(i, 1)
                    break
                }
            }

            this.column3.push(info)
        },

        toColumnfour(name,points, id,now){
            let info = {
                name:name,
                points:points,
                id:id,
                dat:now,
            }

            for(i in this.column3){
                
                if(this.column3[i].id==id){
                    this.column3.splice(i, 1)
                    break
                }
            }

            this.column4.push(info)
            let checks = 1;
        },
    }
});

Vue.component("card",{
    template:`
        <div class="card">
            <h3>{{ name }}</h3>
                <ul>
                    <li></li>
                </ul>
        </div>   
    `
})


let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});