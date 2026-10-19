import type { Dictionary } from "../../types";

/** لوحة التحكم: النظرة العامة، الطلبات، المنتجات، العملاء، شارات الحالة والرسوم البيانية. */
export const dashboard: Dictionary = {
  // ---- Overview page ----
  "Vue d’ensemble": "نظرة عامة",
  "Pilotage temps réel de votre boutique TIDJARATI.": "متابعة فورية لمتجرك على TIDJARATI.",
  "{date} · mise à jour {when}": "{date} · آخر تحديث {when}",
  "Bonjour Noura 👋": "مرحبًا نورة 👋",
  "Votre chiffre d’affaires progresse de": "إيراداتك ترتفع بنسبة",
  "— 3 actions prioritaires vous attendent.": "— ثلاث إجراءات ذات أولوية بانتظارك.",
  "30 derniers jours": "آخر 30 يومًا",
  "Voir le rapport": "عرض التقرير",
  "Chiffre d’affaires": "الإيرادات",
  "Chiffre d'affaires": "الإيرادات",
  "Revenus confirmés, 10 derniers jours": "الإيرادات المؤكدة، آخر 10 أيام",
  Jours: "أيام",
  Semaines: "أسابيع",
  Mois: "أشهر",
  Canaux: "القنوات",
  "Répartition des commandes": "توزيع الطلبات",

  // ---- Channels & product categories ----
  "Pages de captation": "صفحات الهبوط",
  "Page de captation": "صفحة هبوط",
  Boutique: "المتجر",
  Maison: "المنزل",
  Décoration: "الديكور",
  Épicerie: "البقالة",
  Bijoux: "المجوهرات",

  // ---- KPIs ----
  Commandes: "الطلبات",
  "Taux de conversion": "معدل التحويل",
  "Panier moyen": "متوسط قيمة الطلب",
  "4,82 M DZD": "4.82 مليون DZD",
  "1 284": "1,284",
  "3,9 %": "3.9%",
  "3 754 DZD": "3,754 DZD",
  "dont 312 COD en attente": "منها 312 طلب COD في الانتظار",
  "visiteurs → commandes": "الزوار → الطلبات",
  "vs 3 815 le mois dernier": "مقابل 3,815 الشهر الماضي",

  // ---- AI insights ----
  "Recommandations IA": "توصيات الذكاء الاصطناعي",
  "Analyse de vos données des 7 derniers jours": "تحليل بياناتك خلال آخر 7 أيام",
  "3 opportunités": "3 فرص",
  "Relancez les paniers COD abandonnés": "تابع سلات COD المتروكة",
  "312 commandes COD n'ont pas été confirmées sous 24 h. Une relance WhatsApp automatisée à J+1 récupère en moyenne 18 % de ce volume.":
    "لم يتم تأكيد 312 طلب COD خلال 24 ساعة. رسالة متابعة تلقائية عبر واتساب في اليوم الثاني تستعيد في المتوسط 18% من هذا الحجم.",
  "+ 142 000 DZD / mois": "+ 142,000 DZD / شهر",
  "Stock critique sur « Tapis Berbère 120×180 »": "مخزون حرج لـ «Tapis Berbère 120×180»",
  "Rupture estimée dans 3 jours au rythme actuel (ventes +64 % cette semaine).":
    "يُتوقع نفاد المخزون خلال 3 أيام بالمعدل الحالي (المبيعات +64% هذا الأسبوع).",
  Réapprovisionner: "إعادة التخزين",
  "Meilleur créneau d'envoi publicitaire": "أفضل وقت لإرسال الإعلانات",
  "Vos conversions se concentrent entre 20 h et 23 h (UTC+1). Décalez le budget Meta de 3 h pour réduire le CPA de ~11 %.":
    "تتركز تحويلاتك بين الساعة 20 و23 (UTC+1). أزح ميزانية Meta بمقدار 3 ساعات لخفض تكلفة الاكتساب بنحو 11%.",
  "CPA −11 %": "CPA −11%",

  // ---- Funnel ----
  Entonnoir: "المسار التحويلي",
  "Visiteurs → commandes confirmées": "الزوار → الطلبات المؤكدة",
  Visiteurs: "الزوار",
  "Vues produit": "مشاهدات المنتج",
  Paniers: "السلات",
  "Commandes confirmées": "الطلبات المؤكدة",
  "{n} % des visiteurs": "{n}% من الزوار",
  "Taux global :": "المعدل الإجمالي:",
  "3,9 % — supérieur à la moyenne du secteur (2,4 %) sur vos catégories.":
    "3.9% — أعلى من متوسط القطاع (2.4%) في فئاتك.",

  // ---- Recent orders ----
  "Commandes récentes": "الطلبات الأخيرة",
  "Temps réel — synchronisé avec vos transporteurs": "مباشر — متزامن مع شركات التوصيل",
  "Tout voir": "عرض الكل",
  Référence: "المرجع",
  Client: "العميل",
  Statut: "الحالة",
  Total: "الإجمالي",

  // ---- Activity feed ----
  Activité: "النشاط",
  "Événements de l’équipe et de l’IA": "أحداث الفريق والذكاء الاصطناعي",
  "IA TIDJARATI": "الذكاء الاصطناعي TIDJARATI",
  Système: "النظام",
  "a relancé 42 paniers COD abandonnés par WhatsApp": "أعاد تنشيط 42 سلة COD متروكة عبر واتساب",
  "a passé la commande #HN-9841 — 12 700 DZD": "قدّم الطلب #HN-9841 — 12,700 DZD",
  "a synchronisé 18 commandes avec Yalidine": "زامن 18 طلبًا مع Yalidine",
  "a publié la page de captation « Automne 2026 »": "نشر صفحة الهبوط «Automne 2026»",
  "a signalé 3 tentatives de fraude bloquées par reCAPTCHA": "أبلغ عن 3 محاولات احتيال أوقفها reCAPTCHA",

  // ---- Low stock & integrations ----
  "Stock à surveiller": "مخزون يستدعي المتابعة",
  "Produits sous le seuil de réapprovisionnement": "منتجات دون حد إعادة التخزين",
  "Gérer le stock": "إدارة المخزون",
  "{n} ventes sur 30 jours": "{n} عملية بيع خلال 30 يومًا",
  "Connectez votre compte WhatsApp Business": "اربط حسابك على WhatsApp Business",
  "Recevez les confirmations de commandes COD et relancez vos clients automatiquement depuis TIDJARATI.":
    "استقبل تأكيدات طلبات COD وتابع عملاءك تلقائيًا من TIDJARATI.",
  "Connecter WhatsApp": "ربط واتساب",

  // ---- Order status & customer segment badges ----
  "COD à confirmer": "COD في انتظار التأكيد",
  "En préparation": "قيد التحضير",
  Expédiée: "مُرسَلة",
  Livrée: "مُسلَّمة",
  Payée: "مدفوعة",
  Annulée: "ملغاة",
  VIP: "VIP",
  Régulier: "منتظم",
  Nouveau: "جديد",
  "À risque": "معرّض للفقد",

  // ---- Charts ----
  "des commandes": "من الطلبات",

  // ---- Orders page ----
  "Toutes vos commandes, tous canaux confondus — livraison COD et paiement en ligne.":
    "كل طلباتك من جميع القنوات — التوصيل مع الدفع عند الاستلام والدفع الإلكتروني.",
  Exporter: "تصدير",
  "Synchroniser transporteurs": "مزامنة شركات التوصيل",
  Toutes: "الكل",
  Expédiées: "مُرسَلة",
  Livrées: "مُسلَّمة",
  Annulées: "ملغاة",
  "Rechercher une référence, un client, une ville…": "ابحث عن مرجع أو عميل أو مدينة…",
  "Rechercher une commande": "البحث عن طلب",
  "Filtres avancés": "عوامل تصفية متقدمة",
  "Aucune commande ne correspond": "لا توجد طلبات مطابقة",
  "Modifiez vos filtres ou vérifiez la synchronisation avec vos pages de captation.":
    "عدّل عوامل التصفية أو تحقق من المزامنة مع صفحات الهبوط.",
  "Réinitialiser les filtres": "إعادة تعيين عوامل التصفية",
  Canal: "القناة",
  Transporteur: "شركة التوصيل",
  "Appeler le client": "الاتصال بالعميل",
  "Suivre le colis": "تتبّع الطرد",
  "{n} article(s)": "{n} عنصر",
  Fermer: "إغلاق",
  "Confirmer par appel": "التأكيد عبر مكالمة",
  "Montant total": "المبلغ الإجمالي",
  "Canal d’acquisition": "قناة الاكتساب",
  "Non assigné": "غير مُسنَد",
  Articles: "العناصر",
  "Créée": "تاريخ الإنشاء",

  // ---- Products page ----
  Produits: "المنتجات",
  "Catalogue, stocks et prix — synchronisés avec vos pages de captation.":
    "الكتالوج والمخزون والأسعار — متزامنة مع صفحات الهبوط.",
  "Générer une fiche avec l’IA": "إنشاء بطاقة بالذكاء الاصطناعي",
  "Ajouter un produit": "إضافة منتج",
  "Produits actifs": "المنتجات النشطة",
  "Ventes 30 jours": "المبيعات خلال 30 يومًا",
  "Alertes de stock": "تنبيهات المخزون",
  "Rechercher un produit, une référence, une catégorie…": "ابحث عن منتج أو مرجع أو فئة…",
  "Rechercher un produit": "البحث عن منتج",
  "Aucun produit trouvé": "لم يُعثر على أي منتج",
  "Essayez un autre terme de recherche ou ajoutez un nouveau produit à votre catalogue.":
    "جرّب مصطلح بحث آخر أو أضف منتجًا جديدًا إلى كتالوجك.",
  Actif: "نشط",
  Brouillon: "مسودة",
  Archivé: "مؤرشف",
  "{n} ventes / 30 j": "{n} عملية بيع / 30 يومًا",
  Rupture: "نفاد المخزون",
  "{n} en stock": "{n} في المخزون",
  "Le produit sera disponible immédiatement sur vos pages de captation.":
    "سيتوفر المنتج فورًا على صفحات الهبوط.",
  Annuler: "إلغاء",
  "Enregistrer le produit": "حفظ المنتج",
  "Nom du produit": "اسم المنتج",
  "ex. Tapis Berbère 120×180": "مثال: سجادة أمازيغية 120×180",
  "Prix (DZD)": "السعر (DZD)",
  "Stock initial": "المخزون الأولي",
  Catégorie: "الفئة",
  "Maison, Décoration, Bijoux…": "المنزل، الديكور، المجوهرات…",
  "Utilisée pour les filtres automatiques de vos pages.": "تُستخدم لعوامل التصفية التلقائية في صفحاتك.",
  "Fiche produit générée par l’IA": "بطاقة منتج مُنشأة بالذكاء الاصطناعي",
  "Titre, description et argumentaire SEO optimisés pour le marché nord-africain.":
    "عنوان ووصف ونص SEO محسّنة للسوق في شمال إفريقيا.",
  "Insérer dans la fiche": "إدراج في البطاقة",
  "Titre optimisé": "العنوان المُحسَّن",
  Description: "الوصف",
  "Mots-clés SEO": "كلمات SEO المفتاحية",

  // ---- Customers page ----
  Clients: "العملاء",
  "Segmentation automatique basée sur la fréquence, la valeur et le risque d’abandon.":
    "تصنيف تلقائي حسب التكرار والقيمة وخطر الفقد.",
  "Campagne e-mail": "حملة بريد إلكتروني",
  "Tous les clients": "كل العملاء",
  Réguliers: "المنتظمون",
  Nouveaux: "الجدد",
  "Rechercher par nom, e-mail ou téléphone…": "ابحث بالاسم أو البريد الإلكتروني أو الهاتف…",
  "Rechercher un client": "البحث عن عميل",
  "Aucun client trouvé": "لم يُعثر على أي عميل",
  "Vos clients apparaîtront ici dès la première commande confirmée.":
    "سيظهر عملاؤك هنا بعد أول طلب مؤكد.",
  Segment: "الشريحة",
  "Cumul dépensé": "إجمالي الإنفاق",
  "Dernière commande": "آخر طلب",
  Contacter: "تواصل",
  "Appeler · {phone}": "اتصال · {phone}",
  "Envoyer un WhatsApp": "إرسال واتساب",
  "Envoyer un e-mail": "إرسال بريد إلكتروني",

  // ---- Create modal ----
  "Que souhaitez-vous créer ?": "ماذا تريد أن تُنشئ؟",
  "Tout est synchronisé en temps réel avec votre boutique et vos transporteurs.":
    "كل شيء متزامن في الوقت الفعلي مع متجرك وشركات التوصيل.",
  "Un tunnel de vente optimisé pour le COD — 12 sections prêtes à publier.":
    "مسار بيع مُحسَّن للدفع عند الاستلام — 12 قسمًا جاهزة للنشر.",
  Produit: "منتج",
  "Catalogue, stock, variantes et synchronisation transporteur.":
    "الكتالوج والمخزون والمتغيّرات ومزامنة شركة التوصيل.",
  Ajouter: "إضافة",
  Campagne: "حملة",
  "Pixels Meta/TikTok, audiences et suivi des conversions API.":
    "بكسلات Meta/TikTok والجماهير وتتبّع تحويلات API.",
  Lancer: "إطلاق",
  "Inviter un membre": "دعوة عضو",
  "Rôles et permissions granulaires pour votre équipe ou agence.":
    "أدوار وصلاحيات دقيقة لفريقك أو وكالتك.",
  Inviter: "دعوة",
  Créer: "إنشاء",
  "Lien de partage rapide": "رابط مشاركة سريع",
  Copié: "تم النسخ",
  Copier: "نسخ",
  "Partageable sur WhatsApp, Instagram et les marketplaces.": "قابل للمشاركة على واتساب وInstagram والأسواق.",
  "Besoin d’un modèle ?": "تحتاج إلى قالب؟",
  "Bibliothèque de templates": "مكتبة القوالب",
};
