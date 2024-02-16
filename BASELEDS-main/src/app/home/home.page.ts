import { Component } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Definición de variables para referenciar documentos y estados de botones
  tableled1: any;
  tableled2: any;
  tableled3: any;

  clBtn1I: boolean = false;
  clBtn1D: boolean = false;
  clBtn2I: boolean = false;
  clBtn2D: boolean = false;
  clBtn3I: boolean = false;
  clBtn3D: boolean = false;
  clBtnAllI: boolean = false;
  clBtnAllD: boolean = false;

  constructor(private db: Firestore) {
    this.loadStateAndSetColors(); // Cargar estado y establecer colores para los encendidos en la inicialización
    this.loadStateAndSetColors2(); // Cargar estado y establecer colores para los apagados en la inicialización
  }

  async encender() {
    this.tableled1 = doc(this.db, 'controlLED', 'LED1');
    await setDoc(this.tableled1, { encender: true });//para encender LED 1
    this.clBtn1I = true;
    this.clBtn1D = false;
    await this.saveStateData();  // guardamos el estado de encender LED1
  }

  async apagar() {
    this.tableled1 = doc(this.db, 'controlLED', 'LED1');
    await setDoc(this.tableled1, { encender: false });//para apagar LED1
    this.clBtn1D = true;
    this.clBtn1I = false;
    await this.saveStateData2();  //  guardamos el estado de apagar LED1
  }

  async encender2() {
    this.tableled2 = doc(this.db, 'controlLED', 'LED2');
    await setDoc(this.tableled2, { encender: true });//para encender LED2
    this.clBtn2I = true;
    this.clBtn2D = false;
    await this.saveStateData();  // guardamos el estado de encender LED2
  }

  async apagar2() {
    this.tableled2 = doc(this.db, 'controlLED', 'LED2');
    await setDoc(this.tableled2, { encender: false });//para apagar LED2
    this.clBtn2D = true;
    this.clBtn2I = false;
    await this.saveStateData2();  // guardamos el estado de apagar LED2
  }

  async encender3() {
    this.tableled3 = doc(this.db, 'controlLED', 'LED3');
    await setDoc(this.tableled3, { encender: true });//para encender LED3
    this.clBtn3I = true;
    this.clBtn3D = false;
    await this.saveStateData();  // guardamos el estado de encender LED3
  }

  async apagar3() {
    this.tableled3 = doc(this.db, 'controlLED', 'LED3');
    await setDoc(this.tableled3, { encender: false });//para apagar LED3
    this.clBtn3D = true;
    this.clBtn3I = false;
    await this.saveStateData2();  // guardamos el estado de apagar LED3
  }

  async encenderAll() {
    await this.encender();
    await this.encender2();
    await this.encender3();
    this.clBtnAllI = true;
    this.clBtnAllD = false;
    await this.saveStateData();  // guardamos el estado de encender todos los leds
  }

  async apagarAll() {
    await this.apagar();
    await this.apagar2();
    await this.apagar3();
    this.clBtnAllD = true;
    this.clBtnAllI = false;
    await this.saveStateData2();  // guardamos el estado de apagar todos los leds
  }
// Realizamos las funciones para los colores de cada botón tomando en cuenta que succes es para encendido y danger para apagado
  colorBoton1I (state: boolean):string{
    if(state){
      return "success";
    }else{
      return "secondary";
    }
  }

  colorBoton1D (state: boolean):string{
    if(state){
      return "danger";
    }else{
      return "secondary";
    }
  }

  colorBoton2I (state: boolean):string{
    if(state){
      return "success";
    }else{
      return "secondary";
    }
  }

  colorBoton2D (state: boolean):string{
    if(state){
      return "danger";
    }else{
      return "secondary";
    }
  }


  colorBoton3I (state: boolean):string{
    if(state){
      return "success";
    }else{
      return "secondary";
    }
  }

  colorBoton3D (state: boolean):string{
    if(state){
      return "danger";
    }else{
      return "secondary";
    }
  }

  colorBotonAllI (state: boolean):string{
    if(state){
      return "success";
    }else{
      return "secondary";
    }
  }

  colorBotonAllD (state: boolean):string{
    if(state){
      return "danger";
    }else{
      return "secondary";
    }
  }

  // Guardamos los estados de los colores de encendido a su vez de actualizar en la FIRESTORE
  async loadStateAndSetColors() {
    const led1Ref = doc(this.db, 'controlLED', 'LED1');
    const led2Ref = doc(this.db, 'controlLED', 'LED2');
    const led3Ref = doc(this.db, 'controlLED', 'LED3');

    const led1Snap = await getDoc(led1Ref);
    const led2Snap = await getDoc(led2Ref);
    const led3Snap = await getDoc(led3Ref);

    if (led1Snap.exists()) {
      const data1 = led1Snap.data();
      this.clBtn1I = data1?.['encender']?? false;
    }
    if (led2Snap.exists()) {
      const data2 = led2Snap.data();
      this.clBtn2I = data2?.['encender']?? false;
    }
    if (led3Snap.exists()) {
      const data3 = led3Snap.data();
      this.clBtn3I = data3?.['encender']?? false;
    }
    this.clBtnAllI = this.clBtn1I && this.clBtn2I && this.clBtn3I;  // Colocamos de esta manera para que incluya a todos los botones de encendidos
  }
//ESTE METODO REALIZA EL GUARDADO DE LOS ENCENDIDOS Y LOS INICIALIZA EN EL CONSTRUCTOR
  async saveStateData() {
    const led1Ref = doc(this.db, 'controlLED', 'LED1');
    const led2Ref = doc(this.db, 'controlLED', 'LED2');
    const led3Ref = doc(this.db, 'controlLED', 'LED3');

    await setDoc(led1Ref, { encender: this.clBtn1I });
    await setDoc(led2Ref, { encender: this.clBtn2I });
    await setDoc(led3Ref, { encender: this.clBtn3I });

  }


// Guardamos los estados de los colores de apagado a su vez de actualizar en la FIRESTORE
  async loadStateAndSetColors2() {
    const led1Ref = doc(this.db, 'controlLED', 'LED1');
    const led2Ref = doc(this.db, 'controlLED', 'LED2');
    const led3Ref = doc(this.db, 'controlLED', 'LED3');

    const led1Snap = await getDoc(led1Ref);
    const led2Snap = await getDoc(led2Ref);
    const led3Snap = await getDoc(led3Ref);

    if (led1Snap.exists()) {
      const data1 = led1Snap.data();
      this.clBtn1D = data1?.['apagar']?? false;
    }
    if (led2Snap.exists()) {
      const data2 = led2Snap.data();
      this.clBtn2D = data2?.['apagar']?? false;
    }
    if (led3Snap.exists()) {
      const data3 = led3Snap.data();
      this.clBtn3D = data3?.['apagar']?? false;
    }
    this.clBtnAllD = this.clBtn1D && this.clBtn2D && this.clBtn3D;  // Colocamos de esta manera para que incluya a todos los botones de apagado
  }
//ESTE METODO REALIZA EL APAGADO DE LOS ENCENDIDOS Y LOS INICIALIZA EN EL CONSTRUCTOR
  async saveStateData2() {
    const led1Ref = doc(this.db, 'controlLED', 'LED1');
    const led2Ref = doc(this.db, 'controlLED', 'LED2');
    const led3Ref = doc(this.db, 'controlLED', 'LED3');

    await setDoc(led1Ref, { apagar: this.clBtn1D });
    await setDoc(led2Ref, { apagar: this.clBtn2D });
    await setDoc(led3Ref, { apagar: this.clBtn3D });

  }

}