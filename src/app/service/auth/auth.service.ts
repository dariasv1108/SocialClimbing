import { imprimirPantalla } from './../../core/model/util';
import { IUser } from './../../interface/IUser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { error } from 'util';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private user: IUser = {};
	private uidUser: string;

	constructor(private afAuth: AngularFireAuth) {
	}

	async signOn() {
		const { user } = this;
		let result: boolean
		new imprimirPantalla(['User', user.email, 'Password', user.password]);
		console.log('verified', this.isUserVerified())
		if (this.isUserVerified()) {
			await this.login().then(() => {
				new imprimirPantalla('login', true)
				result = true
			}).catch(() => {
				new imprimirPantalla('login', false)
				result = false
			})
		} else {
			result = false
		}
		return result;

	}
	logOut() {
		this.uidUser = '';
		return this.afAuth.auth.signOut();
	}
	generateUidUser() {
		return this.afAuth.authState;
	}
	setUser(user) {
		new imprimirPantalla(user)
		this.user = user;
	}
	private login() {
		return this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
	}
	private sendVerificationEmail() {
		return this.afAuth.auth.currentUser.sendEmailVerification();
	}
	private async isUserVerified() {
		new imprimirPantalla(this.afAuth.auth)
		return await this.afAuth.auth.currentUser.emailVerified;
	}

	getUidUser() {
		return this.uidUser;
	}
	setUidUser(uid: string) {
		this.uidUser = uid;
	}
}
