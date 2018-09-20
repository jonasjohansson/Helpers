var client = new Dropbox.Client({ key: '91n7kq2goawbg88' });
var file = 'log.html';
var btn;

document.addEventListener('DOMContentLoaded', init);

function init() {
	client.authenticate({interactive:true}, function(error, client) {
		if (error)
			alert('Error: ' + error);
	});
	btn = Dropbox.createChooseButton({
		success: function(files) {
			file = files[0].name;
		}
	});
	document.body.appendChild(btn);
}

function write(input,type,tab) {
	client.readFile(file, function(error, data){
		date = the_date();
		url = document.URL;
		text = '<div class="'+type+'" data-url="'+tab.url+'" data-year="'+date.year+'" data-month="'+date.month+'" data-day="'+date.day+'">'+input+'</div>'+"\n"+data;
		client.writeFile(file, text, function (error) {
		});
	});
}

function the_date() {
	now = new Date();
	yyyy = now.getFullYear();
	mm = now.getMonth();
	dd = now.getDate();
	if (mm<10)
		mm = '0'+mm;
	if (dd<10)
		dd = '0'+dd;
	return {year:yyyy,month:mm,day:dd};
}

if (chrome.contextMenus) {
	chrome.contextMenus.create({
		title: 'Add image',
		contexts: ['image'],
		type: 'normal',
		onclick: function(info, tab) {
			write('<a href="'+info.srcUrl+'" target="_blank">'+info.srcUrl+'<img src="'+info.srcUrl+'"></a>','image',tab);
		}
	});
	chrome.contextMenus.create({
		title: 'Add text',
		contexts: ['selection'],
		type: 'normal',
		onclick: function(info,tab) {
			write('<span>'+info.selectionText+'</span>','text',tab);
		}
	});
	chrome.contextMenus.create({
		title: 'Add link',
		contexts: ['link'],
		type: 'normal',
		onclick: function(info, tab) {
			write('<a href="">'+info.linkUrl+'</a>','link',tab); }
	});
}