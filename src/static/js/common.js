$(function () {
  var phoneDialog = $(".phone-dialog");
  var phoneElem = $(".phone-dialog .input");
  var imgbg = $(".phone-dialog .bg").attr("data-src");
  $(".phone-dialog .bg").attr("src", imgbg);

  // 关闭手机输入
  $(".phone-dialog .close").on("click", function () {
    phoneDialog.hide();
  });

  // 显示手机输入
  $(
    ".action-try, .action-try-1, .action-try-2, .action-try-3, .action-try-4, .action-try-5"
  ).on("click", function () {
    phoneDialog.show();
  });

  var loading = false;
  $(".submit-action-1, .submit-action-2").on("click", function () {
    if (loading) {
      return;
    }
    var phone = phoneElem.val();
    if (!/^1\d{10}$/.test(phone)) {
      return alert("请输入正确格式的手机号码");
    }
    loading = true;
    // var data = {
    //   corpid: 12912051,
    //   APPID: "APPID788470583934320640",
    //   APPSECRET: "PXn07J6md8X0vIJxKHd",
    //   list: [
    //     {
    //       followUserId: 7689179,
    //       mobile: phone,
    //       name: "",
    //     },
    //   ],
    //   optUserId: 16618741,
    // };
    var data = {
      phone: phone,
    };
    $.ajax({
      // url: "https://open.workec.com/v2/customer/addCustomer",
      url: "//112.74.111.91/api/customer/createCustomer",
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      timeout: 10000,
      success(rsp) {
        if (rsp.code === 200) {
          alert("数据保存成功");
          phoneElem.val("");
        }
      },
      error() {
        alert("数据提交失败");
      },
      complete() {
        loading = false;
      },
    });
  });
});
