/**
 * Created by Administrator on 2016/11/8.
 */
var filechooser = document.getElementById("choose");
//    ����ѹ��ͼƬ��canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
//    ��Ƭcanvas
var tCanvas = document.createElement("canvas");
var tctx = tCanvas.getContext("2d");
var maxsize = 100 * 1024;
$("#upload").on("click", function() {
    filechooser.click();
})
    .on("touchstart", function() {
        $(this).addClass("touch")
    })
    .on("touchend", function() {
        $(this).removeClass("touch")
    });
filechooser.onchange = function() {
    if (!this.files.length) return;
    var files = Array.prototype.slice.call(this.files);
    if (files.length > 3) {
        alert("���ͬʱֻ���ϴ�3��ͼƬ");
        return;
    }
    files.forEach(function(file, i) {
        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
        var reader = new FileReader();
        var li = document.createElement("li");
//          ��ȡͼƬ��С
        var size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";
        li.innerHTML = '<div class="progress"><span></span></div><div class="size">' + size + '</div>';
        $(".img-list").append($(li));
        reader.onload = function() {
            var result = this.result;
            var img = new Image();
            img.src = result;
            $(li).css("background-image", "url(" + result + ")");
            //���ͼƬ��СС��100kb����ֱ���ϴ�
            if (result.length <= maxsize) {
                img = null;
                upload(result, file.type, $(li));
                return;
            }
//      ͼƬ�������֮�����ѹ����Ȼ���ϴ�
            if (img.complete) {
                callback();
            } else {
                img.onload = callback;
            }
            function callback() {
                var data = compress(img);
                upload(data, file.type, $(li));
                img = null;
            }
        };
        reader.readAsDataURL(file);
    })
};
//    ʹ��canvas�Դ�ͼƬ����ѹ��
function compress(img) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;
    //���ͼƬ�����İ������أ�����ѹ���Ȳ�����Сѹ��400������
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
//        �̵�ɫ
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //���ͼƬ���ش���100����ʹ����Ƭ����
    var count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //����Ҫ�ֳɶ��ٿ���Ƭ
//            ����ÿ����Ƭ�Ŀ�͸�
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }
    //������Сѹ��
    var ndata = canvas.toDataURL('image/jpeg', 0.1);
    console.log('ѹ��ǰ��' + initSize);
    console.log('ѹ����' + ndata.length);
    console.log('ѹ���ʣ�' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
}
//    ͼƬ�ϴ�����base64��ͼƬת�ɶ����ƶ�������formdata�ϴ�
function upload(basestr, type, $li) {
    var text = window.atob(basestr.split(",")[1]);
    var buffer = new Uint8Array(text.length);
    var pecent = 0, loop = null;
    for (var i = 0; i < text.length; i++) {
        buffer[i] = text.charCodeAt(i);
    }
    var blob = getBlob([buffer], type);
    var xhr = new XMLHttpRequest();
    var formdata = getFormData();
    formdata.append('imagefile', blob);
    xhr.open('post', '/cupload');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var jsonData = JSON.parse(xhr.responseText);
            var imagedata = jsonData[0] || {};
            var text = imagedata.path ? '�ϴ��ɹ�' : '�ϴ�ʧ��';
            console.log(text + '��' + imagedata.path);
            clearInterval(loop);
            //���յ�����Ϣʱ�ϴ����
            $li.find(".progress span").animate({'width': "100%"}, pecent < 95 ? 200 : 0, function() {
                $(this).html(text);
            });
            if (!imagedata.path) return;
            $(".pic-list").append('<a href="' + imagedata.path + '">' + imagedata.name + '��' + imagedata.size + '��<img src="' + imagedata.path + '" /></a>');
        }
    };
    //���ݷ��ͽ��ȣ�ǰ50%չʾ�ý���
    xhr.upload.addEventListener('progress', function(e) {
        if (loop) return;
        pecent = ~~(100 * e.loaded / e.total) / 2;
        $li.find(".progress span").css('width', pecent + "%");
        if (pecent == 50) {
            mockProgress();
        }
    }, false);
    //���ݺ�50%��ģ�����
    function mockProgress() {
        if (loop) return;
        loop = setInterval(function() {
            pecent++;
            $li.find(".progress span").css('width', pecent + "%");
            if (pecent == 99) {
                clearInterval(loop);
            }
        }, 100)
    }
    xhr.send(formdata);
}
/**
 * ��ȡblob����ļ�����д��
 * @param buffer
 * @param format
 * @returns {*}
 */
function getBlob(buffer, format) {
    try {
        return new Blob(buffer, {type: format});
    } catch (e) {
        var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
        buffer.forEach(function(buf) {
            bb.append(buf);
        });
        return bb.getBlob(format);
    }
}
/**
 * ��ȡformdata
 */
function getFormData() {
    var isNeedShim = ~navigator.userAgent.indexOf('Android')
        && ~navigator.vendor.indexOf('Google')
        && !~navigator.userAgent.indexOf('Chrome')
        && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
    return isNeedShim ? new FormDataShim() : new FormData()
}
/**
 * formdata ����, ����֧��formdata�ϴ�blob��android���򲹶�
 * @constructor
 */
function FormDataShim() {
    console.warn('using formdata shim');
    var o = this,
        parts = [],
        boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
        oldSend = XMLHttpRequest.prototype.send;
    this.append = function(name, value, filename) {
        parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
        if (value instanceof Blob) {
            parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
            parts.push(value);
        }
        else {
            parts.push('\r\n\r\n' + value);
        }
        parts.push('\r\n');
    };
    // Override XHR send()
    XMLHttpRequest.prototype.send = function(val) {
        var fr,
            data,
            oXHR = this;
        if (val === o) {
            // Append the final boundary string
            parts.push('--' + boundary + '--\r\n');
            // Create the blob
            data = getBlob(parts);
            // Set up and read the blob into an array to be sent
            fr = new FileReader();
            fr.onload = function() {
                oldSend.call(oXHR, fr.result);
            };
            fr.onerror = function(err) {
                throw err;
            };
            fr.readAsArrayBuffer(data);
            // Set the multipart content type and boudary
            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            XMLHttpRequest.prototype.send = oldSend;
        }
        else {
            oldSend.call(this, val);
        }
    };
}