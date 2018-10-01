import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  names;
  insert_res;
  select_res;
  names_value;

  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    private toast: Toast
  ) {

  }

  ionViewDidLoad() {
    this.getData();
  }
  
  ionViewWillEnter() {
    this.getData();
  }
  
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS testtable(id INTEGER, name TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  removeData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DROP TABLE IF EXISTS testtable', {})
      .then(res => {
        console.log('Executed SQL');
        this.toast.show('deleted', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );        
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));    
  }

  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO testtable (id, name) values (?,?)', [1, "yvan"])
        .then(res => {
          console.log(res);
          this.insert_res = JSON.stringify(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
        db.executeSql('INSERT INTO testtable (id, name) values (?,?)', [2, "sara"])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
        db.executeSql('INSERT INTO testtable (id, name) values (?,?)', [3, null])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  findNames() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM testtable WHERE name IS NOT null', {})
      .then(res => {
        this.select_res = JSON.stringify(res);
        this.names = [];
        for(let i=0; i<res.rows.length; i++) {
          this.names.push(res.rows.item(i).name);
        }
        this.names_value = ''+this.names;
      })
      .catch(e => {
        console.log(e);
        this.toast.show(e, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
    // this.toast.show(this.names, '5000', 'center').subscribe(
    //   toast => {
    //     console.log(toast);
    //   }
    // );
  }
  
  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
