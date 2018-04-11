var dataCacheName = 'BrainMRI';
var cacheName = 'BrainMRI';

var filesToCache = [
  '/',
  '/index.html',
  '/babylon.js',
  '/app.js',
  '/dat.gui.min.js',
  '/manifest.json',
  'Saggital/JeffT1_0.jpg','Saggital/JeffT1_1.jpg','Saggital/JeffT1_2.jpg','Saggital/JeffT1_3.jpg','Saggital/JeffT1_4.jpg','Saggital/JeffT1_5.jpg',
  'Saggital/JeffT1_6.jpg','Saggital/JeffT1_7.jpg','Saggital/JeffT1_8.jpg','Saggital/JeffT1_9.jpg','Saggital/JeffT1_10.jpg','Saggital/JeffT1_11.jpg',
  'Saggital/JeffT1_12.jpg','Saggital/JeffT1_13.jpg','Saggital/JeffT1_14.jpg','Saggital/JeffT1_15.jpg','Saggital/JeffT1_16.jpg','Saggital/JeffT1_17.jpg',
  'Saggital/JeffT1_18.jpg','Saggital/JeffT1_19.jpg','Saggital/JeffT1_20.jpg','Saggital/JeffT1_21.jpg','Saggital/JeffT1_22.jpg','Saggital/JeffT1_23.jpg',
  'Saggital/JeffT1_24.jpg','Saggital/JeffT1_25.jpg','Saggital/JeffT1_26.jpg','Saggital/JeffT1_27.jpg','Saggital/JeffT1_28.jpg','Saggital/JeffT1_29.jpg',
  'Saggital/JeffT1_30.jpg','Saggital/JeffT1_31.jpg','Saggital/JeffT1_32.jpg','Saggital/JeffT1_33.jpg','Saggital/JeffT1_34.jpg','Saggital/JeffT1_35.jpg',
  'Saggital/JeffT1_36.jpg','Saggital/JeffT1_37.jpg','Saggital/JeffT1_38.jpg','Saggital/JeffT1_39.jpg','Saggital/JeffT1_40.jpg','Saggital/JeffT1_41.jpg',
  'Saggital/JeffT1_42.jpg','Saggital/JeffT1_43.jpg','Saggital/JeffT1_44.jpg','Saggital/JeffT1_45.jpg','Saggital/JeffT1_46.jpg','Saggital/JeffT1_47.jpg',
  'Saggital/JeffT1_48.jpg','Saggital/JeffT1_49.jpg','Saggital/JeffT1_50.jpg','Saggital/JeffT1_51.jpg','Saggital/JeffT1_52.jpg','Saggital/JeffT1_53.jpg',
  'Saggital/JeffT1_54.jpg','Saggital/JeffT1_55.jpg','Saggital/JeffT1_56.jpg','Saggital/JeffT1_57.jpg','Saggital/JeffT1_58.jpg','Saggital/JeffT1_59.jpg',
  'Saggital/JeffT1_60.jpg','Saggital/JeffT1_61.jpg','Saggital/JeffT1_62.jpg','Saggital/JeffT1_63.jpg','Saggital/JeffT1_64.jpg','Saggital/JeffT1_65.jpg',
  'Saggital/JeffT1_66.jpg','Saggital/JeffT1_67.jpg','Saggital/JeffT1_68.jpg','Saggital/JeffT1_69.jpg','Saggital/JeffT1_70.jpg','Saggital/JeffT1_71.jpg',
  'Saggital/JeffT1_72.jpg','Saggital/JeffT1_73.jpg','Saggital/JeffT1_74.jpg','Saggital/JeffT1_75.jpg','Saggital/JeffT1_76.jpg','Saggital/JeffT1_77.jpg',
  'Saggital/JeffT1_78.jpg','Saggital/JeffT1_79.jpg','Saggital/JeffT1_80.jpg','Saggital/JeffT1_81.jpg','Saggital/JeffT1_82.jpg','Saggital/JeffT1_83.jpg',
  'Saggital/JeffT1_84.jpg','Saggital/JeffT1_85.jpg','Saggital/JeffT1_86.jpg','Saggital/JeffT1_87.jpg','Saggital/JeffT1_88.jpg','Saggital/JeffT1_89.jpg',
  'Saggital/JeffT1_90.jpg','Saggital/JeffT1_91.jpg','Saggital/JeffT1_92.jpg','Saggital/JeffT1_93.jpg','Saggital/JeffT1_94.jpg','Saggital/JeffT1_95.jpg',
  'Saggital/JeffT1_96.jpg','Saggital/JeffT1_97.jpg','Saggital/JeffT1_98.jpg','Saggital/JeffT1_99.jpg','Saggital/JeffT1_100.jpg','Saggital/JeffT1_101.jpg',
  'Saggital/JeffT1_102.jpg','Saggital/JeffT1_103.jpg','Saggital/JeffT1_104.jpg','Saggital/JeffT1_105.jpg','Saggital/JeffT1_106.jpg',
  'Saggital/JeffT1_107.jpg','Saggital/JeffT1_108.jpg','Saggital/JeffT1_109.jpg','Saggital/JeffT1_110.jpg','Saggital/JeffT1_111.jpg',
  'Saggital/JeffT1_112.jpg','Saggital/JeffT1_113.jpg','Saggital/JeffT1_114.jpg','Saggital/JeffT1_115.jpg','Saggital/JeffT1_116.jpg',
  'Saggital/JeffT1_117.jpg','Saggital/JeffT1_118.jpg','Saggital/JeffT1_119.jpg','Saggital/JeffT1_120.jpg','Saggital/JeffT1_121.jpg',
  'Saggital/JeffT1_122.jpg','Saggital/JeffT1_123.jpg','Saggital/JeffT1_124.jpg','Saggital/JeffT1_125.jpg','Saggital/JeffT1_126.jpg',
  'Saggital/JeffT1_127.jpg','Saggital/JeffT1_128.jpg','Coronal_View/CC_1.jpg','Coronal_View/CC_2.jpg','Coronal_View/CC_3.jpg',
  'Coronal_View/CC_4.jpg','Coronal_View/CC_5.jpg','Coronal_View/CC_6.jpg','Coronal_View/CC_7.jpg','Coronal_View/CC_8.jpg','Coronal_View/CC_9.jpg',
  'Coronal_View/CC_10.jpg','Coronal_View/CC_11.jpg','Coronal_View/CC_12.jpg','Coronal_View/CC_13.jpg','Coronal_View/CC_14.jpg','Coronal_View/CC_15.jpg',
  'Coronal_View/CC_16.jpg','Coronal_View/CC_17.jpg','Coronal_View/CC_18.jpg','Coronal_View/CC_19.jpg','Coronal_View/CC_20.jpg','Coronal_View/CC_21.jpg',
  'Coronal_View/CC_22.jpg','Coronal_View/CC_23.jpg','Coronal_View/CC_24.jpg','Coronal_View/CC_25.jpg','Coronal_View/CC_26.jpg','Coronal_View/CC_27.jpg',
  'Coronal_View/CC_28.jpg','Coronal_View/CC_29.jpg','Coronal_View/CC_30.jpg','Axial/3DTOF-0.jpg','Axial/3DTOF-1.jpg','Axial/3DTOF-2.jpg',
  'Axial/3DTOF-3.jpg','Axial/3DTOF-4.jpg','Axial/3DTOF-5.jpg','Axial/3DTOF-6.jpg','Axial/3DTOF-7.jpg','Axial/3DTOF-8.jpg','Axial/3DTOF-9.jpg',
  'Axial/3DTOF-10.jpg','Axial/3DTOF-11.jpg','Axial/3DTOF-12.jpg','Axial/3DTOF-13.jpg','Axial/3DTOF-14.jpg','Axial/3DTOF-15.jpg','Axial/3DTOF-16.jpg',
  'Axial/3DTOF-17.jpg','Axial/3DTOF-18.jpg','Axial/3DTOF-19.jpg','Axial/3DTOF-20.jpg','Axial/3DTOF-21.jpg','Axial/3DTOF-22.jpg','Axial/3DTOF-23.jpg',
  'Axial/3DTOF-24.jpg','Axial/3DTOF-25.jpg','Axial/3DTOF-26.jpg','Axial/3DTOF-27.jpg','Axial/3DTOF-28.jpg','Axial/3DTOF-29.jpg','Axial/3DTOF-30.jpg',
  'Axial/3DTOF-31.jpg','Axial/3DTOF-32.jpg','Axial/3DTOF-33.jpg','Axial/3DTOF-34.jpg','Axial/3DTOF-35.jpg','Axial/3DTOF-36.jpg','Axial/3DTOF-37.jpg',
  'Axial/3DTOF-38.jpg','Axial/3DTOF-39.jpg','Axial/3DTOF-40.jpg','Axial/3DTOF-41.jpg','Axial/3DTOF-42.jpg','Axial/3DTOF-43.jpg','Axial/3DTOF-44.jpg',
  'Axial/3DTOF-45.jpg','Axial/3DTOF-46.jpg','Axial/3DTOF-47.jpg','Axial/3DTOF-48.jpg','Axial/3DTOF-49.jpg','Axial/3DTOF-50.jpg','Axial/3DTOF-51.jpg',
  'Axial/3DTOF-52.jpg','Axial/3DTOF-53.jpg','Axial/3DTOF-54.jpg','Axial/3DTOF-55.jpg','Axial/3DTOF-56.jpg','Axial/3DTOF-57.jpg','Axial/3DTOF-58.jpg',
  'Axial/3DTOF-59.jpg','Axial/3DTOF-60.jpg','Axial/3DTOF-61.jpg','Axial/3DTOF-62.jpg','Axial/3DTOF-63.jpg','Axial/3DTOF-64.jpg','Axial/3DTOF-65.jpg',
  'Axial/3DTOF-66.jpg','Axial/3DTOF-67.jpg','Axial/3DTOF-68.jpg','Axial/3DTOF-69.jpg','Axial/3DTOF-70.jpg','Axial/3DTOF-71.jpg','Axial/3DTOF-72.jpg',
  'Axial/3DTOF-73.jpg','Axial/3DTOF-74.jpg','Axial/3DTOF-75.jpg','Axial/3DTOF-76.jpg','Axial/3DTOF-77.jpg','Axial/3DTOF-78.jpg','Axial/3DTOF-79.jpg',
  'Axial/3DTOF-80.jpg','Axial/3DTOF-81.jpg','Axial/3DTOF-82.jpg','Axial/3DTOF-83.jpg','Axial/3DTOF-84.jpg','Axial/3DTOF-85.jpg','Axial/3DTOF-86.jpg',
  'Axial/3DTOF-87.jpg','Axial/3DTOF-88.jpg','Axial/3DTOF-89.jpg','Axial/3DTOF-90.jpg','Axial/3DTOF-91.jpg','Axial/3DTOF-92.jpg','Axial/3DTOF-93.jpg',
  'Axial/3DTOF-94.jpg','Axial/3DTOF-95.jpg','Axial/3DTOF-96.jpg','Axial/3DTOF-97.jpg','Axial/3DTOF-98.jpg','Axial/3DTOF-99.jpg','Axial/3DTOF-100.jpg'
];

self.addEventListener('install', function(e) {
  console.log('Installing Service Wroker');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Caching required files');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('Service Worker fetching', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});
