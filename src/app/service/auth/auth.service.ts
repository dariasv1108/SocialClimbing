import { IUser } from './../../interface/IUser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { imprimirPantalla } from 'src/app/core/model/util';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private user: IUser = {};

	constructor(private afAuth: AngularFireAuth) { }

	async signOn() {
		const { user } = this;
		new imprimirPantalla(['User', user.email, 'Password', user.password]);
		try {
			this.login();
			if (this.isUserVerified) {
				return true;
			}
			return false;
		} catch (err) {
			new imprimirPantalla(err);
			return false
		}
	}
	logOut() {
		return this.afAuth.auth.signOut();
	}
	getCurrentUserUid() {
		return this.afAuth.auth.currentUser.uid;
	}
	setUser(user) {
		this.user = user;
	}
	private login() {
		return this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
	}
	private sendVerificationEmail() {
		return this.afAuth.auth.currentUser.sendEmailVerification();
	}
	private isUserVerified() {
		return this.afAuth.auth.currentUser.emailVerified;
	}
}
