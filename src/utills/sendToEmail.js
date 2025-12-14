import emailjs from "@emailjs/browser";

// Initialize EmailJS with your user ID
// You can also pass userID in the send function instead
// Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY' with your EmailJS credentials

export const sendEmail = async (formData) => {
  try {
    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      telegram: formData.telegram || "-",
      email: formData.email || "-",
      address: formData.address,
      numberOfChild: formData.numberOfChild,
      children: formData.children
        .map((c, i) => `Ребенок ${i + 1}: ${c.age} лет, тип: ${c.type}`)
        .join("\n"),
      typeOfParent: formData.typeOfParent,
      needJob: formData.needJob ? "Да" : "Нет",
      helpType: formData.helpType.join(", "),
      message: formData.message,
    };

    await emailjs.send(
      "service_eiuc67j",
      "template_7iqq32v",
      templateParams,
      "lOYFN_rtfegZs3TTp"
    );

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};
