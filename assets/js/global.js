document.addEventListener('DOMContentLoaded', function() {
  // lấy danh sách các banner trong hero-slider
  const banners = document.querySelectorAll('#hero-slider .product-section');
  const nextBtn = document.querySelector('#hero-slider .hero-slider-arrow.next');
  const prevBtn = document.querySelector('#hero-slider .hero-slider-arrow.prev');
  if (banners.length > 0) {
    // Tìm index của banner ổi
    let current = 0;
    banners.forEach((b, i) => {
      if (b.id === 'product-guava') current = i;
    });
    // hàm cập nhật màu sắc của header
    function updateHeaderColor() {
      const activeBanner = banners[current];
      const themeColor = getComputedStyle(activeBanner).getPropertyValue('--theme-color').trim(); // lấy màu sắc của banner gán vào bên phải header
      const headerRight = document.querySelector('.header-right');
      if (headerRight && themeColor) {
        headerRight.style.background = themeColor;
      }
    }
    // Chỉ hiện các banner ở vị trí index
    function showBanner(idx) {
      banners.forEach((b, i) => {
        b.classList.toggle('active', i === idx);
      });
      updateHeaderColor();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        current = (current + 1) % banners.length;
        showBanner(current);
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        current = (current - 1 + banners.length) % banners.length;
        showBanner(current);
      });
    }

    // Chuyển banner mỗi 5 giây
    //setInterval(() => {
      //current = (current + 1) % banners.length;
      //showBanner(current);
    //}, 5000);

    showBanner(current);
    updateHeaderColor();
  }

  // Price filter logic
  var toggleBtn = document.getElementById('toggle-price-filter');
  var filterContent = document.getElementById('price-filter-content');
  var filterGroup = toggleBtn ? toggleBtn.closest('.filter-group') : null;
  var minSlider = document.getElementById('price-min');
  var maxSlider = document.getElementById('price-max');
  var minInput = document.getElementById('input-min');
  var maxInput = document.getElementById('input-max');
  var minLabel = document.getElementById('min-price-label');
  var maxLabel = document.getElementById('max-price-label');
  if (toggleBtn && filterContent && filterGroup && minSlider && maxSlider && minInput && maxInput && minLabel && maxLabel) {
    // click vào nút lọc giá ẩn hoặc hiện
    toggleBtn.addEventListener('click', function(e) {
      filterGroup.classList.toggle('open');
      if (filterGroup.classList.contains('open')) {
        filterContent.style.display = 'block';
        // Xoay mũi tên
        var arrow = toggleBtn.querySelector('img');
        if (arrow) arrow.classList.add('rotated-down');
      } else {
        filterContent.style.display = 'none';
        var arrow = toggleBtn.querySelector('img');
        if (arrow) arrow.classList.remove('rotated-down');
      }
      e.stopPropagation();
    });
    function formatPrice(val) {
      return Number(val).toLocaleString('vi-VN') + ' đ';
    }
    function syncSliderInput() { // gán giá trị cho thanh kéo
      var min = parseInt(minSlider.value);
      var max = parseInt(maxSlider.value);
      if (min > max) min = maxSlider.value = min; // nếu giá trị min lớn hơn max thì gán giá trị max cho min
      minInput.value = formatPrice(min);
      maxInput.value = formatPrice(max);
      minLabel.textContent = min === 0 ? '0' : formatPrice(min);
      maxLabel.textContent = formatPrice(max);
    }
    if (minSlider) minSlider.addEventListener('input', function() {
      if (parseInt(minSlider.value) > parseInt(maxSlider.value)) {
        minSlider.value = maxSlider.value;
      }
      syncSliderInput();
    });
    if (maxSlider) maxSlider.addEventListener('input', function() {
      if (parseInt(maxSlider.value) < parseInt(minSlider.value)) {
        maxSlider.value = minSlider.value;
      }
      syncSliderInput();
    });
    if (minInput) minInput.addEventListener('change', function() {
      var val = parseInt(minInput.value.replace(/\D/g, '')) || 0;
      if (val > parseInt(maxSlider.value)) val = parseInt(maxSlider.value);
      minSlider.value = val;
      syncSliderInput();
    });
    if (maxInput) maxInput.addEventListener('change', function() {
      var val = parseInt(maxInput.value.replace(/\D/g, '')) || 0;
      if (val < parseInt(minSlider.value)) val = parseInt(minSlider.value);
      maxSlider.value = val;
      syncSliderInput();
    });
    syncSliderInput();
    var applyBtn = document.getElementById('apply-price-filter');
    if (applyBtn) {
      applyBtn.addEventListener('click', function() {
        var min = parseInt(minSlider.value);
        var max = parseInt(maxSlider.value);
        // TODO: Thực hiện lọc sản phẩm thật ở đây
      });
    }
  }

  // lọc theo Category 
  var toggleCategoryBtn = document.getElementById('toggle-category-filter');
  var categoryContent = document.getElementById('category-filter-content');
  var categoryGroup = toggleCategoryBtn ? toggleCategoryBtn.closest('.filter-group') : null;
  if (toggleCategoryBtn && categoryContent && categoryGroup) {
    toggleCategoryBtn.addEventListener('click', function(e) {
      categoryGroup.classList.toggle('open');
      if (categoryGroup.classList.contains('open')) {
        categoryContent.style.display = 'block';
        var arrow = toggleCategoryBtn.querySelector('img');
        if (arrow) arrow.classList.add('rotated-down');
      } else {
        categoryContent.style.display = 'none';
        var arrow = toggleCategoryBtn.querySelector('img');
        if (arrow) arrow.classList.remove('rotated-down');
      }
      e.stopPropagation();
    });
  }
  // Category apply
  var applyCategoryBtn = document.getElementById('apply-category-filter');
  if (applyCategoryBtn) {
    applyCategoryBtn.addEventListener('click', function() {
      var checked = Array.from(document.querySelectorAll('.category-checkbox input[type="checkbox"]:checked')).map(cb => cb.value);
      // TODO: Thực hiện lọc sản phẩm thật 
    });
  }
  // lọc theo rating
  var toggleRatingBtn = document.getElementById('toggle-rating-filter');
  var ratingContent = document.getElementById('rating-filter-content');
  var ratingGroup = toggleRatingBtn ? toggleRatingBtn.closest('.filter-group') : null;
  if (toggleRatingBtn && ratingContent && ratingGroup) {
    toggleRatingBtn.addEventListener('click', function(e) {
      ratingGroup.classList.toggle('open');
      if (ratingGroup.classList.contains('open')) {
        ratingContent.style.display = 'block';
        var arrow = toggleRatingBtn.querySelector('img');
        if (arrow) arrow.classList.add('rotated-down');
      } else {
        ratingContent.style.display = 'none';
        var arrow = toggleRatingBtn.querySelector('img');
        if (arrow) arrow.classList.remove('rotated-down');
      }
      e.stopPropagation();
    });
  }
  // Rating apply
  var applyRatingBtn = document.getElementById('apply-rating-filter');
  if (applyRatingBtn) {
    applyRatingBtn.addEventListener('click', function() {
      var checked = Array.from(document.querySelectorAll('.rating-checkbox input[type="checkbox"]:checked')).map(cb => cb.value + ' sao');
      // TODO: Thực hiện lọc sản phẩm thật ở đây
    });
  }

  // --- Chip lọc hiển thị trên sản phẩm ---
  const filterTagContainer = document.getElementById('active-filters');
  let activeFilters = [];

  function filterProducts() {
    let priceFilter = activeFilters.find(f => f.type === 'price');
    let minPrice = 0, maxPrice = Infinity;
    if (priceFilter) {
      let [min, max] = priceFilter.value.split('-').map(Number);
      minPrice = min;
      maxPrice = max;
    }
    document.querySelectorAll('.product-card').forEach(card => {
      let price = Number(card.getAttribute('data-price'));
      let show = true;
      if (price < minPrice || price > maxPrice) show = false;
      card.style.display = show ? '' : 'none';
    });
  }

  function renderActiveFilters() {
    if (filterTagContainer) {
      filterTagContainer.innerHTML = '';
      activeFilters.forEach(f => {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.innerHTML = `${f.label} <button class="remove-filter" data-type="${f.type}" data-value="${f.value}">&times;</button>`;
        filterTagContainer.appendChild(tag);
      });
      filterProducts();
    }
  }

  // xoá tag lọc
  if (filterTagContainer) {
    filterTagContainer.addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-filter')) {
        const type = e.target.getAttribute('data-type');
        const value = e.target.getAttribute('data-value');
        // xoá khỏi activeFilters
        if (type === 'category' || type === 'rating') {
          activeFilters = activeFilters.filter(f => !(f.type === type && f.value === value));
        } else {
          activeFilters = activeFilters.filter(f => f.type !== type);
        }
        renderActiveFilters();
        // TODO: Reset UI và lọc lại sản phẩm thật
      }
    });
  }

  // --- ÁP DỤNG FILTER GIÁ ---
  if (applyBtn) {
    applyBtn.addEventListener('click', function() {
      var min = parseInt(minSlider.value);
      var max = parseInt(maxSlider.value);
      // Xóa filter giá cũ
      activeFilters = activeFilters.filter(f => f.type !== 'price');
      activeFilters.push({
        type: 'price',
        value: `${min}-${max}`,
        label: `Giá: ${min.toLocaleString('vi-VN')} - ${max.toLocaleString('vi-VN')} đ`
      });
      renderActiveFilters();
      // ...lọc sản phẩm thật...
    });
  }
  // --- ÁP DỤNG FILTER LOẠI SẢN PHẨM ---
  var applyCategoryBtn = document.getElementById('apply-category-filter');
  if (applyCategoryBtn) {
    applyCategoryBtn.addEventListener('click', function() {
      // Xóa filter loại sản phẩm cũ
      activeFilters = activeFilters.filter(f => f.type !== 'category');
      var checked = Array.from(document.querySelectorAll('.category-checkbox input[type="checkbox"]:checked')).map(cb => cb.value);
      checked.forEach(val => {
        activeFilters.push({
          type: 'category',
          value: val,
          label: val
        });
      });
      renderActiveFilters();
      // ...lọc sản phẩm thật...
    });
  }
  // --- ÁP DỤNG FILTER ĐÁNH GIÁ ---
  var applyRatingBtn = document.getElementById('apply-rating-filter');
  if (applyRatingBtn) {
    applyRatingBtn.addEventListener('click', function() {
      // Xóa filter đánh giá cũ
      activeFilters = activeFilters.filter(f => f.type !== 'rating');
      var checked = Array.from(document.querySelectorAll('.rating-checkbox input[type="checkbox"]:checked')).map(cb => cb.value);
      checked.forEach(val => {
        activeFilters.push({
          type: 'rating',
          value: val,
          label: `${val} sao OCOP`
        });
      });
      renderActiveFilters();
      // ...lọc sản phẩm thật...
    });
  }

  // Tab chuyển cho sản phẩm chi tiết
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = [];
  if (tabBtns.length) {
    // Lấy tất cả phần tử con trực tiếp của .tab-content (trừ script)
    const tabContentContainer = document.querySelector('.tab-content');
    if (tabContentContainer) {
      Array.from(tabContentContainer.children).forEach(child => {
        if (child.nodeType === 1 && !child.matches('script')) tabContents.push(child);
      });
    }
    if (tabBtns.length && tabContents.length) {
      tabBtns.forEach((btn, idx) => {
        if (btn) {
          btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabContents.forEach((c, i) => {
              if (c) c.style.display = (i === idx) ? '' : 'none';
            });
          });
        }
      });
      // Mặc định chỉ hiện tab đầu
      tabContents.forEach((c, i) => { if (c) c.style.display = (i === 0) ? '' : 'none'; });
    }
  }

  // --- hàm search ---
  // chờ header được nhập vào trước
  setTimeout(function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchForm = document.getElementById('search-form');
    
    console.log('Search elements found:', { searchInput, searchResults, searchForm });

  // dữ liệu sản phẩm
  const products = [
    {
      name: "Xoài Cao Lãnh",
      price: "250.000đ",
      image: "assets/images/d8839fd99739fd38075b51d8413167cc05b7dfcc.png",
      link: "sanpham.html",
      category: "Trái cây"
    },
    {
      name: "Ổi nữ hoàng",
      price: "200.000đ",
      image: "assets/images/5f28f0419fd7d4600f22f90d7d06412a133bd1f6.png",
      link: "sanpham.html",
      category: "Trái cây"
    },
    {
      name: "Nhãn Châu Thành",
      price: "150.000đ",
      image: "assets/images/00133549211b438d644373752bf2f0b2001d68f9.png",
      link: "sanpham.html",
      category: "Trái cây"
    },
    {
      name: "Ổi Ruby",
      price: "180.000đ",
      image: "assets/images/18ff8d928ebef7c89b874187227bdc6841f371e8.png",
      link: "sanpham.html",
      category: "Trái cây"
    },
    {
      name: "Mì gạo",
      price: "45.000đ",
      image: "assets/images/2a10bb3b238b8a733d35bddacd4fbb69b105820e.png",
      link: "sanpham.html",
      category: "Gạo - sản phẩm làm từ gạo"
    },
    {
      name: "Tinh dầu sả",
      price: "120.000đ",
      image: "assets/images/47637eab4b60991b0f68a590c74c9e657bd3b417.png",
      link: "sanpham.html",
      category: "Tinh dầu"
    },
    {
      name: "Rượu gạo",
      price: "350.000đ",
      image: "assets/images/479c9234b8ffa6a6f5783f7e9b68b3aa8f02da20.png",
      link: "sanpham.html",
      category: "Rượu"
    }
  ];

  // loại sản phẩm mapping cho search
  const productTypeMapping = {
    "xoài": ["Xoài Cao Lãnh"],
    "ổi": ["Ổi nữ hoàng", "Ổi Ruby"],
    "nhãn": ["Nhãn Châu Thành"],
    "mì": ["Mì gạo"],
    "gạo": ["Mì gạo"],
    "bún": ["Mì gạo"],
    "tinh dầu": ["Tinh dầu sả"],
    "dầu": ["Tinh dầu sả"],
    "rượu": ["Rượu gạo"]
  };

  // hàm lấy đường dẫn ảnh
  function getImagePath(imagePath) {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/') || currentPath.endsWith('/pages/')) {
      // đang ở trong thư mục pages, cần lên một cấp
      return imagePath.replace('assets/images/', '../assets/images/');
    } else {
      // đang ở trong thư mục gốc
      return imagePath;
    }
  }

  // hàm lấy đường dẫn link
  function getLinkPath(linkPath) {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/') || currentPath.endsWith('/pages/')) {
      // đang ở trong thư mục pages, sử dụng đường dẫn tương đối
      return linkPath;
    } else {
      // đang ở trong thư mục gốc, cần thêm pages/
      return linkPath.replace('.html', '.html').replace('sanpham.html', 'pages/sanpham.html');
    }
  }

  function performSearch(query) {
    if (!query.trim()) {
      if (searchResults) searchResults.style.display = 'none';
      return;
    }

    const queryLower = query.toLowerCase();
    
    // kiểm tra xem query có khớp với loại sản phẩm không
    const matchedProductNames = productTypeMapping[queryLower];
    
    if (matchedProductNames) {
      // nếu là tìm kiếm loại sản phẩm, hiển thị các sản phẩm cụ thể
      const filteredProducts = products.filter(product =>
        matchedProductNames.includes(product.name)
      );
      displaySearchResults(filteredProducts, true, query);
    } else {
      // tìm kiếm sản phẩm theo tên
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(queryLower)
      );
      displaySearchResults(filteredProducts, false);
    }
  }

  function displaySearchResults(results, isProductTypeSearch = false, searchTerm = '') {
    if (!searchResults) return;
    
    searchResults.innerHTML = '';

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">Không tìm thấy sản phẩm</div>';
    } else {
      // thêm header loại sản phẩm nếu là tìm kiếm loại sản phẩm
      if (isProductTypeSearch && searchTerm) {
        const productNames = results.map(p => p.name).join(', ');
        const searchHeader = document.createElement('div');
        searchHeader.className = 'search-category-header';
        searchHeader.innerHTML = `
          <div class="search-category-title">Tìm thấy ${results.length} sản phẩm "${searchTerm}": ${productNames}</div>
          <a href="${getLinkPath('sanpham.html')}?products=${encodeURIComponent(productNames)}" class="search-view-all">Xem tất cả</a>
        `;
        searchResults.appendChild(searchHeader);
      }
      
      results.forEach(product => {
        const resultItem = document.createElement('a');
        resultItem.className = 'search-result-item';
        
        // nếu là tìm kiếm loại sản phẩm, thêm products parameter to URL
        if (isProductTypeSearch && searchTerm) {
          const productNames = results.map(p => p.name).join(', ');
          resultItem.href = `${getLinkPath(product.link)}?products=${encodeURIComponent(productNames)}`;
        } else {
          // tìm kiếm sản phẩm theo tên, thêm products parameter to URL
          resultItem.href = `${getLinkPath(product.link)}?products=${encodeURIComponent(product.name)}`;
        }
        
        resultItem.innerHTML = `
          <img src="${getImagePath(product.image)}" alt="${product.name}" class="search-result-image">
          <div class="search-result-info">
            <div class="search-result-name">${product.name}</div>
            <div class="search-result-price">${product.price}</div>
          </div>
        `;
        searchResults.appendChild(resultItem);
      });
    }

    searchResults.style.display = 'block';
  }

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      performSearch(this.value);
    });

    searchInput.addEventListener('focus', function() {
      if (this.value.trim()) {
        performSearch(this.value);
      }
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        const queryLower = query.toLowerCase();
        const matchedProductNames = productTypeMapping[queryLower];
        
        if (matchedProductNames) {
          // nếu là tìm kiếm loại sản phẩm, chuyển hướng với products parameter
          const productNames = matchedProductNames.join(', ');
          window.location.href = `${getLinkPath('sanpham.html')}?products=${encodeURIComponent(productNames)}`;
        } else {
          // tìm kiếm sản phẩm theo tên, chuyển hướng với search parameter
          window.location.href = `${getLinkPath('sanpham.html')}?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // ẩn kết quả tìm kiếm khi click ngoài
  document.addEventListener('click', function(e) {
    if (!searchForm || !searchForm.contains(e.target)) {
      if (searchResults) {
        searchResults.style.display = 'none';
      }
    }
  });

  // xử lý products parameter trên trang sản phẩm
  const urlParams = new URLSearchParams(window.location.search);
  const productsParam = urlParams.get('products');
  
  if (productsParam) {
    // lọc sản phẩm theo tên sản phẩm
    setTimeout(function() {
      const productCards = document.querySelectorAll('.product-card');
      const productNames = productsParam.split(', ');
      
      let foundProducts = 0;
      productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent;
        if (productNames.includes(productName)) {
          card.style.display = 'block';
          foundProducts++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // hiển thị thông báo về kết quả lọc
      const productsArea = document.querySelector('.products-area');
      if (productsArea && foundProducts > 0) {
        const filterMessage = document.createElement('div');
        filterMessage.className = 'filter-message';
        
        let messageText = '';
        if (productNames.length === 1) {
          messageText = `Kết quả tìm kiếm: Hiển thị sản phẩm "${productNames[0]}"`;
        } else {
          messageText = `Kết quả tìm kiếm: Hiển thị ${foundProducts} sản phẩm: ${productNames.join(', ')}`;
        }
        
        filterMessage.innerHTML = `
          <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #386a20;">
            <strong>${messageText}</strong>
            <button onclick="clearFilter()" style="float: right; background: #386a20; color: white; border: none; padding: 4px 12px; border-radius: 4px; cursor: pointer;">Xóa bộ lọc</button>
          </div>
        `;
        productsArea.insertBefore(filterMessage, productsArea.firstChild);
      }
    }, 500); // chờ trang tải xong
  }
  }, 200); // chờ header tải xong
});

// hàm xoá filter
function clearFilter() {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.style.display = 'block';
  });
  
  const filterMessage = document.querySelector('.filter-message');
  if (filterMessage) {
    filterMessage.remove();
  }
  
  // xoá URL parameter
  const url = new URL(window.location);
  url.searchParams.delete('products');
  window.history.replaceState({}, '', url);
}