$(function () {
  const phoneDialog = $(".phone-dialog");
  const phoneElem = $(".phone-dialog .input");
  const imgbg = $(".phone-dialog .bg").attr("data-src");
  $(".phone-dialog .bg").attr("src", imgbg);

  // 关闭手机输入
  $(".phone-dialog .close").on("click", function () {
    phoneDialog.hide();
  });

  // 显示手机输入
  $(
    ".action-try, .action-try-1, .action-try-2, .action-try-3, .action-try-4"
  ).on("click", function () {
    phoneDialog.show();
  });

  // let loading = false;
  // $(".submit-action-1, .submit-action-2").on("click", function () {
  //   if (loading) {
  //     return;
  //   }
  //   const phone = phoneElem.val();
  //   if (!/^1\d{10}$/.test(phone)) {
  //     return alert("请输入正确格式的手机号码");
  //   }
  //   loading = true;
  //   try {
  //     $.post("https://open.workec.com/v2/customer/addCustomer", {
  //       corpid: 12912051,
  //       APPID: "APPID788470583934320640",
  //       APPSECRET: "PXn07J6md8X0vIJxKHd",
  //       list: [
  //         {
  //           followUserId: 7689179,
  //           mobile: phone,
  //           name: "",
  //         },
  //       ],
  //       optUserId: 16618741,
  //       onerror,
  //     }).catch(function () {
  //       console.log(99992);
  //     });
  //   } catch (e) {
  //     console.error(e);
  //     console.log(9999333);
  //   }
  // });
});
