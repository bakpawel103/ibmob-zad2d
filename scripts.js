let db;

window.onload = () => {
	//Open Database
	var request = indexedDB.open('userData', 1);
	
	request.onupgradeneeded = function(e){
		db = e.target.result;
		
		if(!db.objectStoreNames.contains('user')){
      var objectStore = db.createObjectStore('user', { keyPath: 'id' });
      
      objectStore.createIndex('id', 'id', { unique: true });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('postalCode', 'postalCode', { unique: false });
      objectStore.createIndex('nip', 'nip', { unique: false });
      objectStore.createIndex('idNumber', 'idNumber', { unique: false });
      objectStore.createIndex('ipv4', 'ipv4', { unique: false });
      objectStore.createIndex('url', 'url', { unique: false });
      objectStore.createIndex('win1', 'win1', { unique: false });
      objectStore.createIndex('win2', 'win2', { unique: false });
      objectStore.createIndex('ipv6', 'ipv6', { unique: false });
      objectStore.createIndex('etc', 'etc', { unique: false });
      objectStore.createIndex('phone', 'phone', { unique: false });

      // Transaction completed
      objectStore.transaction.oncompleted = (e)=> {
        console.log('Object store "student" created');
        
        const transaction = db.transaction(['user'], 'readwrite');

        const objectStore = transaction.objectStore('user');

        // Add new user
        const request = objectStore.add(getUserData());

        request.onsuccess = ()=> {
            console.log(`New user added, email: ${request.result}`);
        }

        request.onerror = (err)=> {
            console.error(`Error to add new user: ${err}`)
        }
      }
		}
	}
	
	request.onsuccess = function(e){
		console.log('Success: Opened Database...');
    db = e.target.result;
	}
	
	request.onerror = function(e){
		console.log('Error: Could Not Open Database...');
	}
};

function slist(target) {
  target.classList.add("slist");
  let items = target.getElementsByTagName("li"),
    current = null;

  for (let i of items) {
    i.draggable = true;
    i.childNodes.item("del").addEventListener("click", function (e) {
      e.target.parentNode.remove();
    });

    i.ondragstart = (ev) => {
      current = i;
      for (let it of items) {
        if (it != current) {
          it.classList.add("hint");
        }
      }
    };

    i.ondragenter = (ev) => {
      if (i != current) {
        i.classList.add("active");
      }
    };

    i.ondragleave = () => {
      i.classList.remove("active");
    };

    i.ondragend = () => {
      for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }
    };

    i.ondragover = (evt) => {
      evt.preventDefault();
    };

    i.ondrop = (evt) => {
      evt.preventDefault();
      if (i != current) {
        let currentpos = 0,
          droppedpos = 0;
        for (let it = 0; it < items.length; it++) {
          if (current == items[it]) {
            currentpos = it;
          }
          if (i == items[it]) {
            droppedpos = it;
          }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
}

function remove(elem) {
  elem.parentElement.remove();
}

function loadData() {
 const request = db.transaction('user')
                   .objectStore('user')
                   .get(0);

    request.onsuccess = ()=> {
      const user = request.result;
      
      document.getElementById('email').value = user.email;
      document.getElementById('postalCode').value = user.postalCode;
      document.getElementById('nip').value = user.nip;
      document.getElementById('idNumber').value = user.idNumber;
      document.getElementById('ipv4').value = user.ipv4;
      document.getElementById('url').value = user.url;
      document.getElementById('win1').value = user.win1;
      document.getElementById('win2').value = user.win2;
      document.getElementById('ipv6').value = user.ipv6;
      document.getElementById('etc').value = user.etc;
      document.getElementById('phone').value = user.phone;
    }

    request.onerror = (err)=> {
        console.error(`Error to get student information: ${err}`)
    }
}

function saveData() {
  var newUser = getUserData();

  const transaction = db.transaction(['user'], 'readwrite');
  const objectStore = transaction.objectStore('user');

  const request = objectStore.get(0);

  request.onsuccess = () => {
    const updateRequest = objectStore.put(newUser);

    updateRequest.onsuccess = () => {
      console.log(`Estudent updated, email: ${updateRequest.result}`);
    }
  }
}

function getUserData() {
  var email = document.getElementById('email').value;
  var postalCode = document.getElementById('postalCode').value;
  var nip = document.getElementById('nip').value;
  var idNumber = document.getElementById('idNumber').value;
  var ipv4 = document.getElementById('ipv4').value;
  var url = document.getElementById('url').value;
  var win1 = document.getElementById('win1').value;
  var win2 = document.getElementById('win2').value;
  var ipv6 = document.getElementById('ipv6').value;
  var etc = document.getElementById('etc').value;
  var phone = document.getElementById('phone').value;

  return {
    id: 0,
    email: email,
    postalCode: postalCode,
    nip: nip,
    idNumber: idNumber,
    ipv4: ipv4,
    url: url,
    win1: win1,
    win2: win2,
    ipv6: ipv6,
    etc: etc,
    phone: phone
  }
}