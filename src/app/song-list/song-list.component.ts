import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})

export class SongListComponent implements OnInit {

    private songs: Observable<any[]>;
    items = {};
    private uploadPercent;
    isUploading = false;
    private songFile;
    private audioPlayer;

    item = {
        trackNo: "",
        title: "",
        artist: "",
        album: "",
        year: ""
    }

    constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
        this.songs = db.collection('songs').doc('Taeyeon').collection("I - The First Mini Album").valueChanges();
    }

    ngOnInit() {
        this.audioPlayer = document.getElementById("audioPlayer");
    }

    selectSong(event) {
        this.songFile = event;
    }

    uploadSong(event, item) {
        this.isUploading = true;
        const file = event.target.files[0];
        const filePath = item.artist + '/' + item.album + '/' + item.trackNo + '. ' + item.title;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        task.percentageChanges().subscribe((value) => {
            this.uploadPercent = parseInt(value.toFixed(0), 10);
            $('#uploadProgressBar').css('width', this.uploadPercent+'%');
        });

        task.snapshotChanges().pipe(
            finalize(
                () => {

                    fileRef.getDownloadURL().subscribe((url) => {
                        this.setSongInformation(item, url);
                    });

                }
            )
        ).subscribe();
    }

    setSongInformation(item, downloadUrl) {
        this.db.collection('songs').doc('Taeyeon').collection(item.album).doc(item.trackNo + ' ' + item.title).set({
            trackNo: item.trackNo,
            title: item.title,
            artist: item.artist,
            album: item.album,
            year: item.year,
            url: downloadUrl
        });

        this.isUploading = false;
    }

    playSong(songURL) {

        if (this.audioPlayer.src != songURL) {
            this.audioPlayer.src = songURL;
        }

        this.audioPlayer.play();
    }

    pauseSong(songURL) {
        this.audioPlayer.pause();
    }
}
