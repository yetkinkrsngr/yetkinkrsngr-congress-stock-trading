# Kongre Üyelerinin Hisse Senedi İşlemleri

Bu proje, ABD Kongre üyelerinin hisse senedi işlemlerini takip etmek ve analiz etmek için geliştirilmiş bir web uygulamasıdır. House Stock Watcher API'sini kullanarak kongre üyelerinin tüm alım-satım işlemlerini görüntüler ve analiz eder.

![Proje Önizleme](preview.png)

## 🚀 Özellikler

### 📊 İstatistik Paneli
- En aktif kongre üyelerinin listesi
- En çok işlem gören hisselerin analizi
- Parti bazında işlem dağılımı
- Toplam işlem hacmi gösterimi

### 🔍 Gelişmiş Filtreleme
- Çoklu filtre desteği
- Anlık arama (debounced search)
- Tarih aralığı seçimi
- Parti bazında filtreleme
- İşlem tipi filtreleme (Alım/Satım)
- Miktar bazında filtreleme
- Eyalet ve sektör bazında filtreleme

### 📋 Veri Yönetimi
- Sayfalama sistemi
- Sütunlara göre sıralama
- CSV formatında dışa aktarma
- Detaylı veri görüntüleme

### ⭐ Kişiselleştirme
- Favori temsilciler listesi
- Hisse senedi izleme listesi
- Genişletilebilir satır detayları
- Mobil uyumlu tasarım

## 🛠️ Kullanılan Teknolojiler

- **Next.js 15.1.5** - React framework
- **Tailwind CSS** - Stil ve tasarım
- **Axios** - API istekleri
- **React Hooks** - State yönetimi
- **Modern JavaScript** - ES6+ özellikleri

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/proje-adi.git
```

2. Proje dizinine gidin:
```bash
cd proje-adi
```

3. Bağımlılıkları yükleyin:
```bash
npm install
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda açın:
```
http://localhost:3000
```

## 🎯 Kullanım

### Arama ve Filtreleme
- Üst kısımdaki arama çubuğunu kullanarak temsilci, hisse veya açıklama araması yapabilirsiniz
- Filtreler bölümünden parti, işlem tipi, miktar, tarih, eyalet ve sektör filtrelerini kullanabilirsiniz
- Tüm filtreler anlık olarak uygulanır ve sonuçlar otomatik güncellenir

### İstatistikler
- "İstatistikler" bölümünü açarak özet verileri görüntüleyebilirsiniz
- En aktif temsilciler ve en popüler hisseler hakkında bilgi alabilirsiniz
- Parti dağılımı ve toplam işlem hacmini görebilirsiniz

### Favori ve İzleme Listeleri
- Temsilcilerin yanındaki yıldız (★) ikonuna tıklayarak favorilere ekleyebilirsiniz
- Hisselerin yanındaki göz (👁) ikonuna tıklayarak izleme listesine ekleyebilirsiniz
- Eklenen öğeler üst kısımda liste halinde görüntülenir

### Veri İşlemleri
- Her sütun başlığına tıklayarak sıralama yapabilirsiniz
- "CSV İndir" butonu ile verileri dışa aktarabilirsiniz
- Her satırın sonundaki "Göster" butonu ile detaylı bilgileri görüntüleyebilirsiniz

## 📱 Responsive Tasarım

Uygulama tamamen responsive olarak tasarlanmıştır:
- Mobil cihazlarda optimize edilmiş görünüm
- Tablet ve masaüstü için özelleştirilmiş layout
- Dinamik grid sistemi
- Esnek tablo görünümü

## 🔄 API Entegrasyonu

Uygulama, House Stock Watcher API'si ile entegre çalışır:
- Gerçek zamanlı veri güncellemesi
- Hızlı veri çekme ve işleme
- Hata yönetimi ve yükleme durumları
- Veri önbelleğe alma

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

## 🙏 Teşekkürler

- [House Stock Watcher](https://housestockwatcher.com) - API ve veri kaynağı
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
