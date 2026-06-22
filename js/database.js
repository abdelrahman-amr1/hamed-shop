// Aswan Shop Database Manager

const DEFAULT_PRODUCTS = [
  // --- 1. Spices (التوابل) ---
  { id: "s1", name: "فلفل أسود أسواني", category: "spices", price: 0, unit: "100 جرام", available: true, description: "فلفل أسود فاخر طازج برائحة نفاذة وطعم قوي." },
  { id: "s2", name: "كمون بلدي منقى", category: "spices", price: 0, unit: "100 جرام", available: true, description: "كمون بلدي ذو طعم مميز ورائحة عطرية قوية من قلب أسوان." },
  { id: "s3", name: "كزبرة ناشفة", category: "spices", price: 0, unit: "100 جرام", available: true, description: "كزبرة جافة منقاة بعناية، مثالية لجميع المأكولات." },
  { id: "s4", name: "السبع بهارات الأسوانية", category: "spices", price: 0, unit: "100 جرام", available: true, description: "خلطة بهارات سحرية بنسب متوازنة ونكهة لا تُقاوم." },
  { id: "s5", name: "شطة حمراء ناري", category: "spices", price: 0, unit: "100 جرام", available: true, description: "شطة أسوانية حارة جداً، مطحونة من قرون الشطة الطبيعية المجففة." },
  { id: "s6", name: "حبهان (هيل) فاخر حصى", category: "spices", price: 0, unit: "100 جرام", available: true, description: "حبهان جامبو ذو فصوص ممتلئة ورائحة عطرية مكثفة." },
  { id: "s7", name: "بابريكا مدخنة", category: "spices", price: 0, unit: "100 جرام", available: true, description: "بابريكا طبيعية حلوة ومدخنة بلون أحمر غني ونكهة رائعة." },
  { id: "s8", name: "بهارات لحمة مميزة", category: "spices", price: 0, unit: "100 جرام", available: true, description: "خلطة خاصة لتتبيل جميع أنواع اللحوم وإعطائها مذاقاً شهياً." },
  { id: "s9", name: "بهارات فراخ فاخرة", category: "spices", price: 0, unit: "100 جرام", available: true, description: "خلطة مخصصة لتتبيل الدجاج المشوي والمطبوخ بنكهة ممتازة." },
  { id: "s10", name: "كاري هندي أصلي", category: "spices", price: 0, unit: "100 جرام", available: true, description: "بهار الكاري ذو اللون الذهبي الجميل والمذاق الدافئ الغني." },
  { id: "s11", name: "روز ماري (إكليل الجبل)", category: "spices", price: 0, unit: "100 جرام", available: true, description: "أوراق الروزماري المجففة ذات الرائحة العشبية المنعشة." },
  { id: "s12", name: "خولنجان", category: "spices", price: 0, unit: "100 جرام", available: true, description: "جذور الخولنجان، بهار مميز للمأكولات والمشروبات الدافئة." },
  { id: "s13", name: "جوزة الطيب كاملة", category: "spices", price: 0, unit: "حبة", available: true, description: "ثمار جوزة الطيب الكاملة الفاخرة لطحنها طازجة عند الاستخدام." },
  { id: "s14", name: "ليمون أسود (لومي) كامل", category: "spices", price: 0, unit: "100 جرام", available: true, description: "ليمون أسواني مجفف، أساسي للأرز البسمتي والكبسة والشوربة." },
  { id: "s15", name: "ورق لاورا (غار) منقى", category: "spices", price: 0, unit: "100 جرام", available: true, description: "أوراق غار عريضة ونظيفة لإضافة نكهة غنية للشوربات واللحوم." },
  { id: "s16", name: "ريحان بري مجفف", category: "spices", price: 0, unit: "100 جرام", available: true, description: "أوراق ريحان مجففة عطرة وممتازة للتتبيل أو المشروبات." },
  { id: "s17", name: "قرنفل (مسمار) فاخر", category: "spices", price: 0, unit: "100 جرام", available: true, description: "مسمار قرنفل ذو رائحة نفاذة وطعم قوي حار." },
  { id: "s18", name: "بصل بودر فاخر", category: "spices", price: 0, unit: "100 جرام", available: true, description: "مسحوق البصل المجفف النقي بدون أي إضافات لتسهيل الطبخ." },
  { id: "s19", name: "ثوم بودر فاخر", category: "spices", price: 0, unit: "100 جرام", available: true, description: "مسحوق الثوم المجفف النقي ذو الطعم المركز والرائحة القوية." },
  { id: "s20", name: "قرفة أعواد خشبية", category: "spices", price: 0, unit: "100 جرام", available: true, description: "أعواد قرفة خشبية عطرية ممتازة للطبخ والمشروبات الساخنة." },
  { id: "s21", name: "مستكة أكل أصلية", category: "spices", price: 0, unit: "10 جرام", available: true, description: "فصوص مستكة طبيعية نقية للطعام والشوربات والحلويات." },
  { id: "s22", name: "زر ورد بلدي مجفف", category: "spices", price: 0, unit: "100 جرام", available: true, description: "بتلات زر الورد المجففة العطرية لإضافتها لخلطات البهارات والشاي." },

  // --- 2. Drinks (المشروبات الطبيعية) ---
  { id: "d1", name: "كركديه أسواني لوزة فاخر", category: "drinks", price: 0, unit: "100 جرام", available: true, description: "كركديه لوزة أسواني أصلي بلون أحمر ياقوتي داكن ومذاق رائع بارد وسخن." },
  { id: "d2", name: "تمر هندي كور أسواني", category: "drinks", price: 0, unit: "كرة (حوالي 250 جرام)", available: true, description: "تمر هندي طبيعي كور ممتاز لتحضير المشروب الرمضاني المنعش." },
  { id: "d3", name: "حلف بر بلدي مجفف", category: "drinks", price: 0, unit: "100 جرام", available: true, description: "عشبة حلف البر الأسوانية الطبيعية والمفيدة جداً للمجاري البولية." },
  { id: "d4", name: "حبة البركة (الكمون الأسود)", category: "drinks", price: 0, unit: "100 جرام", available: true, description: "بذور حبة البركة الغنية بالفوائد لتناولها أو غليها كمشروب دافئ." },
  { id: "d5", name: "شمر بلدي منقى", category: "drinks", price: 0, unit: "100 جرام", available: true, description: "بذور الشمر العطرية المهدئة والمريحة للمعدة بنكهة اليانسون الخفيفة." },
  { id: "d6", name: "بذور كتان طبيعية", category: "drinks", price: 0, unit: "100 جرام", available: true, description: "بذور الكتان الغنية بالألياف والأوميجا-3، رائعة للغلي أو مع الطعام." },
  { id: "d7", name: "دوم أسواني مجروش فاخر", category: "drinks", price: 0, unit: "250 جرام", available: true, description: "دوم مجروش طبيعي ممتاز لعمل عصير الدوم الأسواني المنعش والمفيد للضغط." },
  { id: "d8", name: "عرق سوس منقى", category: "drinks", price: 0, unit: "250 جرام", available: true, description: "مسحوق عرق السوس الفاخر سريع التحضير بطعم أصيل وحلاوة طبيعية." },
  { id: "d9", name: "بذور شيا طبيعية", category: "drinks", price: 0, unit: "100 جرام", available: true, description: "بذور الشيا الأصلية الغنية بالطاقة والفوائد الغذائية المتعددة." },
  { id: "d10", name: "يانسون بلدي فاخر", category: "drinks", price: 0, unit: "100 جرام", available: true, description: "يانسون بلدي ذو رائحة ونكهة عطرية قوية ومهدئ ممتاز للجسم." },
  { id: "d11", name: "كراوية بلدية منقاة", category: "drinks", price: 0, unit: "100 جرام", available: true, description: "كراوية بلدية مفيدة ومريحة للمعدة ومناسبة جداً للأطفال والكبار." },
  { id: "d12", name: "تيليو (زهر الزيزفون)", category: "drinks", price: 0, unit: "100 جرام", available: true, description: "أوراق وزهور التيليو المهدئة للأعصاب والمسكنة للسعال والبرد." },

  // --- 3. Herbs (الأعشاب الطبيعية) ---
  { id: "h1", name: "أشواجاندا (جينسينج هندي)", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "جذور الأشواجاندا النقية لتقليل التوتر، زيادة الطاقة وتحسين النوم." },
  { id: "h2", name: "شرش زلوع أصلي", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "جذور شرش الزلوع البري المعروف بفوائده القوية لزيادة النشاط والحيوية." },
  { id: "h3", name: "بذور القرع (لب قرع نيا)", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "بذور القرع النيئة الغنية بالزنك والمعادن المفيدة جداً لصحة البروستاتا." },
  { id: "h4", name: "حب الرشاد بلدي", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "بذور حب الرشاد الغنية بالكالسيوم والحديد والمفيدة جداً للمفاصل والعظام." },
  { id: "h5", name: "مورينجا أوراق مجففة", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "أوراق المورينجا (شجرة الحياة) الغنية بالفيتامينات ومضادات الأكسدة." },
  { id: "h6", name: "مر بطارخ (مر حجازي) قطع", category: "herbs", price: 0, unit: "50 جرام", available: true, description: "صمغ المر الطبيعي الفاخر، مضاد حيوي طبيعي ومطهر للمعدة والجروح." },
  { id: "h7", name: "راوند (جذور الراوند)", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "جذور الراوند الطبيعية المفيدة لتنظيم الهضم وعلاج الإمساك." },
  { id: "h8", name: "عود إيكر (عرق الوج)", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "جذور عود الإيكر العشبية المفيدة للذاكرة والجهاز الهضمي." },
  { id: "h9", name: "أوراق زيتون القدس مجففة", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "أوراق زيتون القدس الطبيعية الممتازة لتخفيض نسبة السكر وضغط الدم." },
  { id: "h10", name: "مسحوق جذور الماكا", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "مسحوق جذور الماكا الأصلية لتعزيز القدرة البدنية والتحمل والتوازن الهرموني." },
  { id: "h11", name: "حبوب لقاح النحل طبيعية", category: "herbs", price: 0, unit: "100 جرام", available: true, description: "حبوب لقاح النحل الغنية بالبروتينات والإنزيمات لتقوية المناعة العامة." },
  { id: "h12", name: "جذور الجنسينج الأحمر", category: "herbs", price: 0, unit: "50 جرام", available: true, description: "جنسينج أحمر كوري أصلي لزيادة التركيز وتنشيط الدورة الدموية." },

  // --- 4. Natural Oils (الزيوت الطبيعية) ---
  { id: "o1", name: "زيت الروزماري خام نقي", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت إكليل الجبل المركز، ممتاز لتنشيط فروة الرأس وتحفيز نمو الشعر." },
  { id: "o2", name: "زيت الجوجوبا طبيعي معصور بارد", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "مرطب طبيعي رائع للبشرة ولطيف على فروة الرأس والشعر الجاف." },
  { id: "o3", name: "زيت اللوز الحلو نقي", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت خفيف ومغذي للبشرة يساعد على توحيد اللون وتقليل الهالات السوداء." },
  { id: "o4", name: "زيت زيتون بكر ممتاز", category: "oils", price: 0, unit: "زجاجة 250 مل", available: true, description: "عصرة أولى على البارد بنسبة حموضة منخفضة جداً، مفيد للأكل والشعر." },
  { id: "o5", name: "زيت الجرجير الطبيعي خام", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت الجرجير المركز لتغذية جذور الشعر ومنع تساقطه وزيادة طوله." },
  { id: "o6", name: "زيت حبة البركة معصور بارد", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "مستخلص حبة البركة الغني بالفيتامينات، مفيد للمناعة وللشعر والبشرة." },
  { id: "o7", name: "زيت الأرجان المغربي الأصلي", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت الأرجان النقي (الذهب السائل) لتنعيم الشعر وتغذية البشرة بعمق." },
  { id: "o8", name: "زيت الخروع المركز", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت لزج وثقيل ممتاز لزيادة كثافة الرموش والحواجب وإطالة الشعر." },
  { id: "o9", name: "زيت جوز الهند العضوي", category: "oils", price: 0, unit: "عبوة 200 مل", available: true, description: "زيت جوز هند بكر طبيعي ذو رائحة ممتازة يتجمد في البرودة، مثالي للشعر والبشرة." },
  { id: "o10", name: "زيت الصبار الطبيعي", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "مستخلص الصبار لتهدئة البشرة، علاج الحروق الخفيفة وترطيب فروة الرأس." },
  { id: "o11", name: "زيت الجلسرين الطبيعي نقاوة 100%", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "مرطب فائق القوة للبشرة الجافة، يُستعمل مع الليمون لتفتيح البشرة." },
  { id: "o12", name: "زيت الخردل المركز", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت الخردل الدافئ لتنشيط الدورة الدموية في الفروة وتطويل الشعر." },
  { id: "o13", name: "زيت الحلبة الطبيعي", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "مستخلص الحلبة المعصور بارد لترطيب وتسمين مناطق الوجه والبشرة." },
  { id: "o14", name: "زيت عشبة 304 الخاصة للشعر", category: "oils", price: 0, unit: "عبوة 200 مل", available: true, description: "تركيبة زيوت طبيعية خاصة 304 لتطويل وتكثيف وتنعيم الشعر التالف." },
  { id: "o15", name: "زيت الفازلين الطبيعي", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت خفيف لتنعيم وتصفيف الشعر وحماية البشرة من الجفاف الشديد." },
  { id: "o16", name: "زيت ذيل الحصان الأصلي", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت غني بالسيليكا الطبيعية يعمل على تقوية ألياف الشعر ومنع تكسره." },
  { id: "o17", name: "زيت الحرجل الأسواني", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت الحرجل العشبي الفعال في تخفيف آلام المفاصل والروماتيزم." },
  { id: "o18", name: "زيت قرع العسل (اليقطين)", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت بذور اليقطين النقي، يمنع تساقط الشعر الهرموني وممتاز للبشرة." },
  { id: "o19", name: "زيت الزنجبيل الحار", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "مستخلص الزنجبيل الدافئ لتنشيط الفروة وتدليك العضلات لتخفيف التوتر." },
  { id: "o20", name: "زيت القرفة العطري", category: "oils", price: 0, unit: "عبوة 100 مل", available: true, description: "زيت القرفة الدافئ ذو الرائحة العطرية القوية والمنشطة للجسم والبشرة." },

  // --- 5. Incense (البخور المشكل) ---
  { id: "i1", name: "خلطة البخور الأسوانية الخاصة H.M", category: "incense", price: 0, unit: "علبة (حوالي 150 جرام)", available: true, description: "خلطة خاصة ومميزة جداً من أعشاب وعطور أسوان النادرة. رائحة ذكية تدوم طويلاً، متوفرة حصرياً لدينا." },

  // --- 6. Famous Aswan Products (المنتجات المشهورة في أسوان) ---
  { id: "f1", name: "فسيخ أسواني سوبر كلابي فاخر", category: "famous", price: 0, unit: "كيلو", available: true, description: "فسيخ أسواني أصلي مملح بعناية، لحم زبدة وردي ونسبة ملوحة مضبوطة تماماً." },
  { id: "f2", name: "ملوحة أسوانية ممتازة", category: "famous", price: 0, unit: "كيلو", available: true, description: "ملوحة راية أسوانية فاخرة، منظفة ومحفوظة بالزيت والخل والبهارات." },
  { id: "f3", name: "مش قديم فلاحي بالمرتة والبهارات", category: "famous", price: 0, unit: "برطمان 1 كيلو", available: true, description: "جبنة مش قديمة معتقة غنية بالطعم القوي ومتبلة بالفلفل الأحمر والقرون الحارة." },
  { id: "f4", name: "سوداني أسواني مقشر سوبر مقلي", category: "famous", price: 0, unit: "كيلو", available: true, description: "سوداني أسواني بلدي مقشر ومحمص بعناية، ذو حجم كبير وطعم مقرمش شهي." },
  { id: "f5", name: "عيش شمس أسواني طازج", category: "famous", price: 0, unit: "رغيف كبير", available: true, description: "الخبز الشمسي الأسواني التقليدي المخبوز على الطريقة الأصلية في الشمس." },
  { id: "f6", name: "فايش أسواني باللبن والسمن البلدي", category: "famous", price: 0, unit: "كيلو", available: true, description: "فايش مقرمش ومحمص برائحة الكركم واللبن والسمن البلدي الأسواني الأصيل." }
];

const DB_KEY = "aswan_shop_products";

// Initialize Database in localStorage
function initDatabase() {
  const current = localStorage.getItem(DB_KEY);
  if (!current) {
    localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  } else {
    // If it exists, check if the first item (s1) has a price > 0,
    // or if its name still contains "مطحون".
    // If so, force reset once to apply the new pricing and names.
    try {
      const parsed = JSON.parse(current);
      if (parsed.length > 0) {
        const firstItem = parsed[0];
        if (firstItem.price > 0 || firstItem.name.includes("مطحون")) {
          localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_PRODUCTS));
        }
      }
    } catch (e) {
      localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    }
  }
}

// Get all products from database
function getProducts() {
  initDatabase();
  try {
    return JSON.parse(localStorage.getItem(DB_KEY));
  } catch (e) {
    console.error("Error reading products database, resetting to default.", e);
    localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
}

// Save products to database
function saveProducts(products) {
  localStorage.setItem(DB_KEY, JSON.stringify(products));
  // Dispatch a custom event to notify other windows or components
  window.dispatchEvent(new Event("productsUpdated"));
}

// Reset database to default
function resetDatabase() {
  localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  window.dispatchEvent(new Event("productsUpdated"));
  return DEFAULT_PRODUCTS;
}

// Initialize on script load
initDatabase();
