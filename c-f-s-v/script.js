document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current tab and content
            btn.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });

    // Tạo sự kiện
    const openModalBtn = document.getElementById('openModalBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const createForm = document.getElementById('createEventForm');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('eventImage');
    const fileName = document.getElementById('fileName');

    // bước tiếp theo
    const nextToSocial = document.getElementById('nextToSocial');
    const backToStep1 = document.getElementById('backToStep1');
    const createEventBtn = document.getElementById('createEvent');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');

    // Sửa sự kiện
    const closeEditModalBtn = document.getElementById('closeEditModalBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editModalOverlay = document.getElementById('editModalOverlay');
    const editEventForm = document.getElementById('editEventForm');
    const editButtons = document.querySelectorAll('.edit-event-btn');
    const editUploadBtn = document.getElementById('editUploadBtn');
    const editFileInput = document.getElementById('editEventImage');
    const editFileName = document.getElementById('editFileName');

    // Mở modal tạo sự kiện
    openModalBtn.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Reset về step 1 khi mở modal
        if (step1 && step2) {
            step1.classList.add('active');
            step2.classList.remove('active');
        }
    });

    // Đóng modal tạo sự kiện
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Đóng khi click ra ngoài modal tạo
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Xử lý upload file cho modal tạo
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = 'Chưa có ảnh nào được chọn';
        }
    });

    // Step navigation - Chuyển đến bước 2
    if (nextToSocial) {
        nextToSocial.addEventListener('click', function() {
            // Kiểm tra form trước khi chuyển
            const eventName = document.getElementById('eventName').value;
            if (!eventName) {
                alert('Vui lòng nhập tên sự kiện');
                return;
            }
            
            step1.classList.remove('active');
            step2.classList.add('active');
        });
    }

    // Step navigation - Quay lại bước 1
    if (backToStep1) {
        backToStep1.addEventListener('click', function() {
            step2.classList.remove('active');
            step1.classList.add('active');
        });
    }

    // Step navigation - Tạo sự kiện
    if (createEventBtn) {
        createEventBtn.addEventListener('click', function() {
            // Lấy dữ liệu từ form
            const formData = {
                name: document.getElementById('eventName').value,
                description: document.getElementById('eventDescription').value,
                startTime: document.getElementById('eventStartTime').value,
                endTime: document.getElementById('eventEndTime').value,
                deadline: document.getElementById('registrationDeadline').value,
                organization: document.getElementById('eventOrganization').value,
                location: document.getElementById('eventLocation').value,
                link: document.getElementById('registrationLink').value,
                image: fileInput.files[0] ? fileInput.files[0].name : null
            };
            
            // Lấy các kênh mạng xã hội đã chọn
            const selectedChannels = [];
            document.querySelectorAll('input[name="socialChannels"]:checked').forEach(checkbox => {
                selectedChannels.push(checkbox.value);
            });
            formData.channels = selectedChannels;
            
            console.log('Dữ liệu sự kiện:', formData);
            alert('Tạo sự kiện thành công!');
            closeModal();
        });
    }

    // Xử lý submit form tạo sự kiện (cho trường hợp không có step navigation)
    if (createForm && !nextToSocial) {
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu từ form
            const formData = {
                name: document.getElementById('eventName').value,
                description: document.getElementById('eventDescription').value,
                startTime: document.getElementById('eventStartTime').value,
                endTime: document.getElementById('eventEndTime').value,
                deadline: document.getElementById('registrationDeadline').value,
                organization: document.getElementById('eventOrganization').value,
                location: document.getElementById('eventLocation').value,
                link: document.getElementById('registrationLink').value,
                image: fileInput.files[0] ? fileInput.files[0].name : null
            };
            
            // Xử lý dữ liệu
            console.log('Dữ liệu sự kiện:', formData);
            
            // Hiển thị thông báo
            alert('Tạo sự kiện thành công!');
            
            // Đóng modal
            closeModal();
            
            // Reset form
            createForm.reset();
            fileName.textContent = 'Chưa có ảnh nào được chọn';
        });
    }

    // Mở modal chỉnh sửa sự kiện - LẤY DỮ LIỆU THẬT TỪ HTML
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.content-card');
            
            // Lấy dữ liệu thật từ HTML
            const eventName = eventCard.querySelector('.date p').textContent;
            const eventDescription = eventCard.querySelector('.event-info p:first-child').textContent;
            
            // Lấy thông tin chi tiết từ các dòng trong event-info
            const eventDetails = eventCard.querySelectorAll('.event-info p');
            let startTime = '', endTime = '', deadline = '', location = '', organization = '', link = '';
            
            eventDetails.forEach(p => {
                const text = p.textContent;
                console.log('Checking text:', text); // Debug
                
                if (text.includes('⏰ Thời gian:')) {
                    const timeMatch = text.match(/⏰ Thời gian:\s*(.+)/);
                    if (timeMatch) {
                        const timeText = timeMatch[1].trim();
                        console.log('Time text found:', timeText); // Debug
                        
                        // Xử lý các định dạng thời gian khác nhau
                        if (timeText.includes(' - ')) {
                            // Định dạng: "7:30 22/11/2026 - 15:00 22/11/2026"
                            const timeParts = timeText.split(' - ');
                            startTime = timeParts[0] ? timeParts[0].trim() : '';
                            endTime = timeParts[1] ? timeParts[1].trim() : '';
                        } else if (timeText.includes('–')) {
                            // Định dạng: "18h00 – ngày 08/11/2025"
                            const timeParts = timeText.split('–');
                            startTime = timeParts[0] ? timeParts[0].trim() : '';
                            endTime = timeParts[1] ? timeParts[1].trim() : '';
                        } else {
                            // Định dạng: "17h00 ngày 25/11/2025"
                            startTime = timeText;
                        }
                    }
                } else if (text.includes('📅 Hạn đăng ký:')) {
                    const deadlineMatch = text.match(/📅 Hạn đăng ký:\s*(.+)/);
                    if (deadlineMatch) deadline = deadlineMatch[1].trim();
                } else if (text.includes('📍 Địa điểm:')) {
                    const locationMatch = text.match(/📍 Địa điểm:\s*(.+)/);
                    if (locationMatch) location = locationMatch[1].trim();
                } else if (text.includes('🏢 Tổ chức:')) {
                    const orgMatch = text.match(/🏢 Tổ chức:\s*(.+)/);
                    if (orgMatch) organization = orgMatch[1].trim();
                }
            });
            
            // Lấy link đăng ký
            const linkElement = eventCard.querySelector('.dki');
            if (linkElement) {
                link = linkElement.getAttribute('href') || linkElement.textContent.replace('→', '').trim();
            }
            
            // Lấy ảnh
            const imageElement = eventCard.querySelector('.content-image img');
            const imageSrc = imageElement ? imageElement.src : '';
            
            // Debug thông tin lấy được
            console.log('Raw data extracted:');
            console.log('Start Time:', startTime);
            console.log('End Time:', endTime);
            console.log('Deadline:', deadline);
            
            // Điền dữ liệu vào form chỉnh sửa
            document.getElementById('editEventId').value = this.getAttribute('data-event-id');
            document.getElementById('editEventName').value = eventName;
            document.getElementById('editEventDescription').value = eventDescription;
            
            // Chuyển đổi và điền thời gian
            document.getElementById('editEventStartTime').value = convertToDateTimeLocal(startTime);
            document.getElementById('editEventEndTime').value = convertToDateTimeLocal(endTime);
            document.getElementById('editRegistrationDeadline').value = convertToDateTimeLocal(deadline);
            
            document.getElementById('editEventOrganization').value = organization;
            document.getElementById('editEventLocation').value = location;
            document.getElementById('editRegistrationLink').value = link;
            
            // Hiển thị tên file ảnh nếu có
            if (imageSrc) {
                editFileName.textContent = 'Ảnh hiện tại: ' + imageSrc.split('/').pop();
            }
            
            editModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Đóng modal chỉnh sửa
    function closeEditModal() {
        editModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        editEventForm.reset();
        editFileName.textContent = 'Chưa có ảnh nào được chọn';
    }

    closeEditModalBtn.addEventListener('click', closeEditModal);
    cancelEditBtn.addEventListener('click', closeEditModal);

    // Đóng modal chỉnh sửa khi click bên ngoài
    editModalOverlay.addEventListener('click', function(event) {
        if (event.target === editModalOverlay) {
            closeEditModal();
        }
    });

    // Xử lý upload file cho modal chỉnh sửa
    editUploadBtn.addEventListener('click', function() {
        editFileInput.click();
    });

    editFileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            editFileName.textContent = this.files[0].name;
        } else {
            editFileName.textContent = 'Chưa có ảnh nào được chọn';
        }
    });

    // Xử lý submit form chỉnh sửa
    editEventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        const formData = {
            id: document.getElementById('editEventId').value,
            name: document.getElementById('editEventName').value,
            description: document.getElementById('editEventDescription').value,
            startTime: document.getElementById('editEventStartTime').value,
            endTime: document.getElementById('editEventEndTime').value,
            deadline: document.getElementById('editRegistrationDeadline').value,
            organization: document.getElementById('editEventOrganization').value,
            location: document.getElementById('editEventLocation').value,
            link: document.getElementById('editRegistrationLink').value,
            image: editFileInput.files[0] ? editFileInput.files[0].name : null
        };
        
        // Xử lý dữ liệu
        console.log('Dữ liệu sự kiện (chỉnh sửa):', formData);
        
        // Hiển thị thông báo
        alert('Cập nhật sự kiện thành công!');
        
        // Đóng modal
        closeEditModal();
    });

    // Đóng bằng phím ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modalOverlay.classList.contains('active')) {
                closeModal();
            }
            if (editModalOverlay.classList.contains('active')) {
                closeEditModal();
            }
        }
    });

    // Hàm chuyển đổi định dạng thời gian từ text sang datetime-local
    function convertToDateTimeLocal(timeString) {
        if (!timeString) return '';
        
        console.log('Converting time:', timeString); // Debug
        
        // Loại bỏ khoảng trắng thừa
        timeString = timeString.trim();
        
        // 1. Định dạng: "17h00 ngày 25/11/2025"
        let match = timeString.match(/(\d{1,2})h(\d{2})\s+ngày\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (match) {
            const [_, hour, minute, day, month, year] = match;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute}`;
        }
        
        // 2. Định dạng: "18h00 – ngày 08/11/2025"
        match = timeString.match(/(\d{1,2})h(\d{2})\s*–\s*ngày\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (match) {
            const [_, hour, minute, day, month, year] = match;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute}`;
        }
        
        // 3. Định dạng: "7:30 22/11/2026 - 15:00 22/11/2026" (chỉ lấy phần đầu)
        match = timeString.match(/(\d{1,2}):(\d{2})\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (match) {
            const [_, hour, minute, day, month, year] = match;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute}`;
        }
        
        // 4. Định dạng: "17h30 Ngày 15/11/2025"
        match = timeString.match(/(\d{1,2})h(\d{2})\s+Ngày\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (match) {
            const [_, hour, minute, day, month, year] = match;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute}`;
        }
        
        // 5. Định dạng: "17h30, ngày 25/10/2025"
        match = timeString.match(/(\d{1,2})h(\d{2}),\s+ngày\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (match) {
            const [_, hour, minute, day, month, year] = match;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute}`;
        }
        
        // 6. Định dạng hạn đăng ký: "22/11/2025 đến hết ngày 24/11/2025" (lấy phần đầu)
        match = timeString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (match && timeString.includes('đến hết')) {
            const [_, day, month, year] = match;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T23:59`;
        }
        
        // 7. Định dạng hạn đăng ký: "25/10 đến 23h59' ngày 1/11" (cần năm - giả sử năm hiện tại)
        match = timeString.match(/(\d{1,2})\/(\d{1,2})\s+đến\s+23h59'/);
        if (match) {
            const currentYear = new Date().getFullYear();
            const [_, day, month] = match;
            return `${currentYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T23:59`;
        }
        
        // 8. Định dạng ISO (nếu đã đúng format)
        if (timeString.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)) {
            return timeString;
        }
        
        console.log('No time format matched for:', timeString);
        return '';
    }
});

// Modal xem thông tin
const viewModalOverlay = document.getElementById('viewModalOverlay');
const closeViewModalBtn = document.getElementById('closeViewModalBtn');
const closeViewBtn = document.getElementById('closeViewBtn');
const approveEventBtn = document.getElementById('approveEventBtn');
const rejectEventBtn = document.getElementById('rejectEventBtn');
const seeButtons = document.querySelectorAll('.see-btn');

// Mở modal xem thông tin
seeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const eventCard = this.closest('.content-card');
        
        // Lấy dữ liệu thật từ HTML
        const eventName = eventCard.querySelector('.date p').textContent;
        const eventDescription = eventCard.querySelector('.event-info p:first-child').textContent;
        
        // Lấy thông tin chi tiết từ các dòng trong event-info
        const eventDetails = eventCard.querySelectorAll('.event-info p');
        let startTime = '', endTime = '', deadline = '', location = '', organization = '', link = '';
        
        eventDetails.forEach(p => {
            const text = p.textContent;
            
            if (text.includes('⏰ Thời gian:')) {
                const timeMatch = text.match(/⏰ Thời gian:\s*(.+)/);
                if (timeMatch) {
                    const timeText = timeMatch[1].trim();
                    if (timeText.includes(' - ')) {
                        const timeParts = timeText.split(' - ');
                        startTime = timeParts[0] ? timeParts[0].trim() : '';
                        endTime = timeParts[1] ? timeParts[1].trim() : '';
                    } else if (timeText.includes('–')) {
                        const timeParts = timeText.split('–');
                        startTime = timeParts[0] ? timeParts[0].trim() : '';
                        endTime = timeParts[1] ? timeParts[1].trim() : '';
                    } else {
                        startTime = timeText;
                    }
                }
            } else if (text.includes('📅 Hạn đăng ký:')) {
                const deadlineMatch = text.match(/📅 Hạn đăng ký:\s*(.+)/);
                if (deadlineMatch) deadline = deadlineMatch[1].trim();
            } else if (text.includes('📍 Địa điểm:')) {
                const locationMatch = text.match(/📍 Địa điểm:\s*(.+)/);
                if (locationMatch) location = locationMatch[1].trim();
            } else if (text.includes('🏢 Tổ chức:')) {
                const orgMatch = text.match(/🏢 Tổ chức:\s*(.+)/);
                if (orgMatch) organization = orgMatch[1].trim();
            }
        });
        
        // Lấy link đăng ký
        const linkElement = eventCard.querySelector('.dki');
        if (linkElement) {
            link = linkElement.getAttribute('href') || linkElement.textContent.replace('→', '').trim();
        }
        
        // Lấy ảnh
        const imageElement = eventCard.querySelector('.content-image img');
        const imageSrc = imageElement ? imageElement.src : '';
        
        // Lấy trạng thái
        const statusBadge = eventCard.querySelector('.status-badge');
        const status = statusBadge ? statusBadge.textContent : '';
        const statusClass = statusBadge ? statusBadge.className : '';
        
        // Lấy kênh mạng xã hội
        const mxhElements = eventCard.querySelectorAll('.mxh div, .displaymxh div');
        const channels = [];
        mxhElements.forEach(el => {
            if (el.textContent.includes('Web')) channels.push('Web');
            if (el.textContent.includes('Facebook')) channels.push('Facebook');
            if (el.textContent.includes('Zalo')) channels.push('Zalo');
        });
        
        // Điền dữ liệu vào modal xem
        document.getElementById('viewEventName').textContent = eventName;
        document.getElementById('viewEventDescription').textContent = eventDescription;
        document.getElementById('viewEventStartTime').textContent = startTime;
        document.getElementById('viewEventEndTime').textContent = endTime;
        document.getElementById('viewRegistrationDeadline').textContent = deadline;
        document.getElementById('viewEventOrganization').textContent = organization;
        document.getElementById('viewEventLocation').textContent = location;
        
        const viewLink = document.getElementById('viewRegistrationLink');
        viewLink.href = link;
        viewLink.textContent = link;
        
        if (imageSrc) {
            document.getElementById('viewEventImage').src = imageSrc;
        }
        
        // Hiển thị trạng thái
        const statusElement = document.getElementById('viewEventStatus');
        statusElement.textContent = status;
        statusElement.className = 'status-badge ' + statusClass;
        
        // Hiển thị kênh mạng xã hội
        const channelsContainer = document.getElementById('viewSocialChannels');
        channelsContainer.innerHTML = '';
        channels.forEach(channel => {
            const channelTag = document.createElement('span');
            channelTag.className = 'channel-tag';
            channelTag.textContent = channel;
            channelsContainer.appendChild(channelTag);
        });
        
        // Lưu event ID cho các hành động
        const eventId = this.getAttribute('data-event-id');
        approveEventBtn.setAttribute('data-event-id', eventId);
        rejectEventBtn.setAttribute('data-event-id', eventId);
        
        viewModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Đóng modal xem thông tin
function closeViewModal() {
    viewModalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeViewModalBtn.addEventListener('click', closeViewModal);
closeViewBtn.addEventListener('click', closeViewModal);

// Đóng khi click ra ngoài modal xem
viewModalOverlay.addEventListener('click', function(event) {
    if (event.target === viewModalOverlay) {
        closeViewModal();
    }
});

// Xử lý duyệt sự kiện
approveEventBtn.addEventListener('click', function() {
    const eventId = this.getAttribute('data-event-id');
    if (confirm('Bạn có chắc chắn muốn duyệt sự kiện này?')) {
        // Gọi API hoặc xử lý duyệt sự kiện
        console.log('Duyệt sự kiện ID:', eventId);
        alert('Đã duyệt sự kiện thành công!');
        
        // Cập nhật UI: chuyển sự kiện sang tab "Đã duyệt"
        // Code để chuyển sự kiện giữa các tab...
        
        closeViewModal();
    }
});

// Xử lý từ chối sự kiện
rejectEventBtn.addEventListener('click', function() {
    const eventId = this.getAttribute('data-event-id');
    const reason = prompt('Lý do từ chối sự kiện:');
    
    if (reason !== null) {
        if (reason.trim() === '') {
            alert('Vui lòng nhập lý do từ chối!');
            return;
        }
        
        // Gọi API hoặc xử lý từ chối sự kiện
        console.log('Từ chối sự kiện ID:', eventId, 'Lý do:', reason);
        alert('Đã từ chối sự kiện!');
        
        // Cập nhật UI: xóa sự kiện khỏi tab "Chờ duyệt"
        // Code để xóa sự kiện...
        
        closeViewModal();
    }
});

// Thêm xử lý phím ESC cho modal xem
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (viewModalOverlay.classList.contains('active')) {
            closeViewModal();
        }
    }
});


// Tìm kiếm sự kiện
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        searchEvents(searchTerm);
    });
}

// Hàm tìm kiếm sự kiện
function searchEvents(searchTerm) {
    const allEvents = document.querySelectorAll('.content-card');
    let foundEvents = false;

    allEvents.forEach(eventCard => {
        const eventName = eventCard.querySelector('.date p').textContent.toLowerCase();
        const eventDescription = eventCard.querySelector('.event-info p:first-child').textContent.toLowerCase();
        const eventOrganization = eventCard.querySelector('.event-info p:last-child').textContent.toLowerCase();
        const eventLocation = eventCard.querySelector('.event-info p:nth-child(4)')?.textContent.toLowerCase() || '';
        
        // Kiểm tra xem có khớp với từ khóa tìm kiếm không
        const matchesSearch = eventName.includes(searchTerm) || 
                             eventDescription.includes(searchTerm) || 
                             eventOrganization.includes(searchTerm) ||
                             eventLocation.includes(searchTerm);

        if (matchesSearch || searchTerm === '') {
            eventCard.style.display = 'block';
            foundEvents = true;
        } else {
            eventCard.style.display = 'none';
        }
    });

    // Hiển thị thông báo nếu không tìm thấy sự kiện nào
    showNoResultsMessage(foundEvents, searchTerm);
}

// Hàm hiển thị thông báo không có kết quả
function showNoResultsMessage(foundEvents, searchTerm) {
    // Xóa thông báo cũ nếu có
    const oldMessage = document.querySelector('.no-results-message');
    if (oldMessage) {
        oldMessage.remove();
    }

    // Nếu có từ khóa tìm kiếm và không tìm thấy sự kiện nào
    if (searchTerm && !foundEvents) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.style.cssText = `
            text-align: center;
            padding: 40px;
            color: #666;
            font-size: 16px;
            grid-column: 1 / -1;
        `;
        noResultsMessage.innerHTML = `
            <p>Không tìm thấy sự kiện nào phù hợp với từ khóa "<strong>${searchTerm}</strong>"</p>
            <p style="margin-top: 10px; font-size: 14px; color: #888;">Hãy thử tìm kiếm với từ khóa khác</p>
        `;

        // Thêm thông báo vào container của các tab
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            activeTab.appendChild(noResultsMessage);
        }
    }
}


// Xử lý xóa sự kiện
document.addEventListener('DOMContentLoaded', function() {
    // Thêm event listener cho các nút xóa hiện có
    addDeleteEventListeners();
});

// Hàm thêm event listener cho các nút xóa
function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const eventCard = this.closest('.content-card');
            if (eventCard) {
                deleteEvent(eventCard);
            }
        });
    });
}

// Hàm xóa sự kiện
function deleteEvent(eventCard) {
    // Lấy thông tin sự kiện để hiển thị trong confirm
    const eventName = eventCard.querySelector('.date p').textContent;
    const eventOrganization = eventCard.querySelector('.event-info p:last-child').textContent.replace('🏢 Tổ chức: ', '');
    
    // Hiển thị confirm dialog
    if (confirm(`Bạn có chắc chắn muốn xóa sự kiện "${eventName}" của ${eventOrganization}?`)) {
        // Thêm hiệu ứng xóa
        eventCard.style.transition = 'all 0.3s ease';
        eventCard.style.opacity = '0';
        eventCard.style.transform = 'translateX(-100px)';
        
        setTimeout(() => {
            // Xóa khỏi DOM
            eventCard.remove();
            
            // Hiển thị thông báo
            showDeleteNotification(`Đã xóa sự kiện "${eventName}" thành công!`);
            
            // Kiểm tra nếu không còn sự kiện nào trong tab
            checkEmptyTab();
            
        }, 300);
    }
}

// Hàm hiển thị thông báo xóa thành công
function showDeleteNotification(message) {
    // Xóa thông báo cũ nếu có
    const oldNotification = document.querySelector('.delete-notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Tạo thông báo mới
    const notification = document.createElement('div');
    notification.className = 'delete-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        max-width: 400px;
        font-size: 14px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Tự động xóa thông báo sau 3 giây
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Hàm kiểm tra tab trống và hiển thị thông báo
function checkEmptyTab() {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        const visibleEvents = activeTab.querySelectorAll('.content-card:not([style*="display: none"])');
        
        if (visibleEvents.length === 0) {
            showEmptyTabMessage(activeTab);
        } else {
            removeEmptyTabMessage(activeTab);
        }
    }
}

// Hàm hiển thị thông báo tab trống
function showEmptyTabMessage(tab) {
    // Kiểm tra xem đã có thông báo chưa
    if (tab.querySelector('.empty-tab-message')) {
        return;
    }
    
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'empty-tab-message';
    emptyMessage.style.cssText = `
        text-align: center;
        padding: 60px 20px;
        color: #666;
        grid-column: 1 / -1;
    `;
    emptyMessage.innerHTML = `
        <div style="font-size: 64px; margin-bottom: 16px;">📭</div>
        <h3 style="margin-bottom: 8px; color: #333;">Không có sự kiện nào</h3>
        <p style="margin-bottom: 0; opacity: 0.7;">Tất cả sự kiện đã được xóa hoặc không có sự kiện nào trong danh sách này</p>
    `;
    
    tab.appendChild(emptyMessage);
}

// Hàm xóa thông báo tab trống
function removeEmptyTabMessage(tab) {
    const emptyMessage = tab.querySelector('.empty-tab-message');
    if (emptyMessage) {
        emptyMessage.remove();
    }
}

