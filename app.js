    // Audio engine using Web Audio API
    class PremiumAudioEngine {
      constructor() {
        this.ctx = null;
        this.enabled = false;
        this.alarmInterval = null;
      }

      init() {
        try {
          if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
          }
          if (this.ctx.state === 'suspended') {
            this.ctx.resume();
          }
        } catch (err) {
          console.error('AudioContext initialization failed:', err);
        }
      }

      toggle(forceState) {
        this.enabled = forceState !== undefined ? forceState : !this.enabled;
        if (this.enabled) {
          this.init();
        }
        return this.enabled;
      }

      playClick() {
        if (!this.enabled || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(850, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.04);
      }

      playNfcChime() {
        if (!this.enabled || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now);
        gain1.gain.setValueAtTime(0.04, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc1.start(now);
        osc1.stop(now + 0.2);
        
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659.25, now + 0.08);
        gain2.gain.setValueAtTime(0.04, now + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc2.start(now + 0.08);
        osc2.stop(now + 0.3);
      }

      startBuzzerAlarm() {
        if (!this.enabled || !this.ctx || this.alarmInterval) return;
        this.init();
        
        const playTone = () => {
          if (!this.enabled || !this.ctx) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.linearRampToValueAtTime(400, now + 0.35);
          
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
          osc.start(now);
          osc.stop(now + 0.4);
        };
        
        playTone();
        this.alarmInterval = setInterval(playTone, 600);
      }

      stopBuzzerAlarm() {
        if (this.alarmInterval) {
          clearInterval(this.alarmInterval);
          this.alarmInterval = null;
        }
      }
    }

    const sound = new PremiumAudioEngine();

    // DOM References
    const statusBarTime = document.getElementById('statusBarTime');
    const statusBatteryFill = document.getElementById('statusBatteryFill');
    const headerWelcome = document.getElementById('headerWelcome');
    const bearRow = document.getElementById('bearRow');
    const btnMuteToggle = document.getElementById('btnMuteToggle');
    const muteIcon = document.getElementById('muteIcon');
    const hudNotice = document.getElementById('hudNotice');
    const hudNoticeText = document.getElementById('hudNoticeText');
    const dlgEmergency = document.getElementById('dlgEmergency');
    const btnEmergencyReset = document.getElementById('btnEmergencyReset');
    const dlgAlignWarning = document.getElementById('dlgAlignWarning');
    const btnAlignWarningClose = document.getElementById('btnAlignWarningClose');
    const dlgPlateInput = document.getElementById('dlgPlateInput');
    const btnEditPlate = document.getElementById('btnEditPlate');
    const btnPlateInputCancel = document.getElementById('btnPlateInputCancel');
    const btnPlateInputSave = document.getElementById('btnPlateInputSave');
    const iptCarPlate = document.getElementById('iptCarPlate');
    const lblRegisteredPlate = document.getElementById('lblRegisteredPlate');
    
    // Tab switching controls
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    const pageViews = document.querySelectorAll('.page-view');
    let tabSwitchTimeout = null;

    // Home Page DOM elements
    const cybertruckImg = document.getElementById('cybertruckImg');
    const carStatusBadge = document.getElementById('carStatusBadge');
    const carStatusSubText = document.getElementById('carStatusSubText');
    const alignmentDot = document.getElementById('alignmentDot');
    const alignmentText = document.getElementById('alignmentText');
    
    const cardCharge = document.getElementById('cardCharge');
    const chargeBadge = document.getElementById('chargeBadge');
    const chargeHeadline = document.getElementById('chargeHeadline');
    const chargeProgressTrack = document.getElementById('chargeProgressTrack');
    const chargeProgressBar = document.getElementById('chargeProgressBar');
    const btnAction = document.getElementById('btnAction');
    
    const valBattery = document.getElementById('valBattery');
    const valRange = document.getElementById('valRange');
    const valPower = document.getElementById('valPower');
    const valTime = document.getElementById('valTime');
    
    const cardSafety = document.getElementById('cardSafety');
    const safetyBadge = document.getElementById('safetyBadge');
    const safetyHeadline = document.getElementById('safetyHeadline');
    const valTemp = document.getElementById('valTemp');
    const valSmoke = document.getElementById('valSmoke');
    const valRelay = document.getElementById('valRelay');
    const lblTempDetail = document.getElementById('lblTempDetail');
    const lblSmokeDetail = document.getElementById('lblSmokeDetail');
    const lblRelayDetail = document.getElementById('lblRelayDetail');
    const nfcLogsArea = document.getElementById('nfcLogsArea');
    
    // Map Page DOM elements
    const mapPins = document.querySelectorAll('.map-pin');
    const mapCards = document.querySelectorAll('.map-spot-card');

    // Simulator Drawer DOM elements
    const simDrawer = document.getElementById('simDrawer');
    const simHeader = document.getElementById('simHeader');
    const btnSimNfc = document.getElementById('btnSimNfc');
    const chkSimAlign = document.getElementById('chkSimAlign');
    const rngSimTemp = document.getElementById('rngSimTemp');
    const rngSimSmoke = document.getElementById('rngSimSmoke');
    const lblSimTemp = document.getElementById('lblSimTemp');
    const lblSimSmoke = document.getElementById('lblSimSmoke');
    const btnSimResetAlert = document.getElementById('btnSimResetAlert');
    const btnSimRetryCharge = document.getElementById('btnSimRetryCharge');

    // States
    let isMuted = true;
    let isAligned = true;
    let batteryLevel = 76;
    let currentRange = 428;
    let chargingState = 'standby'; // 'standby', 'ready_to_charge', 'charging', 'alarm'
    let isNfcScanned = false;
    let temperatureVal = 24.5;
    let smokeVal = 82;
    let chargingTimer = null;
    let chargeStartTimeout = null;
    let chargeCyclePower = 0.0;
    let chargeStartTime = null;
    let chargeStartBattery = 0;
    const chargeHistory = [];
    
    // Live clock updating
    function updateClock() {
      const now = new Date();
      let hrs = String(now.getHours()).padStart(2, '0');
      let mins = String(now.getMinutes()).padStart(2, '0');
      statusBarTime.textContent = `${hrs}:${mins}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Show temporary notice hud
    function showNotice(msg) {
      hudNoticeText.textContent = msg;
      hudNotice.classList.add('visible');
      setTimeout(() => hudNotice.classList.remove('visible'), 1600);
    }

    // Toggle mute
    btnMuteToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      const isEnabled = sound.toggle(!isMuted);
      
      if (isEnabled) {
        muteIcon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
        `;
        btnMuteToggle.style.color = 'var(--toss-blue)';
        btnMuteToggle.style.backgroundColor = 'var(--toss-blue-light)';
        sound.playClick();
        showNotice("사운드 활성화");
      } else {
        muteIcon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
        `;
        btnMuteToggle.style.color = 'var(--text-secondary)';
        btnMuteToggle.style.backgroundColor = '#ffffff';
        showNotice("사운드 음소거");
      }
    });

    // Tab Switching Mechanism with Native Animations
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTabName = btn.getAttribute('data-tab');
        const activeTabBtn = document.querySelector('.nav-tab-btn.active');
        const activeView = document.querySelector('.page-view.active');
        const targetView = document.getElementById(`view${targetTabName}`);
        
        if (btn === activeTabBtn) return;
        
        sound.playClick();
        
        // Update tab buttons
        activeTabBtn.classList.remove('active');
        activeTabBtn.setAttribute('aria-selected', 'false');
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        
        // Dynamic title update depending on pages
        if (targetTabName === 'Home') {
          headerWelcome.innerHTML = chargingState === 'alarm' ? '<span style="color:var(--toss-red);">위험 감지</span> 충전 차단됨' : `안녕하세요, 게스트님`;
        } else if (targetTabName === 'Map') {
          headerWelcome.innerHTML = `근처의 무선 충전소`;
        } else if (targetTabName === 'History') {
          headerWelcome.innerHTML = `나의 충전 이력`;
        } else if (targetTabName === 'Settings') {
          headerWelcome.innerHTML = `서비스 설정`;
        }

        // Show bears only on Home page
        if (bearRow) {
          if (targetTabName === 'Home') {
            bearRow.style.display = 'flex';
          } else {
            bearRow.style.display = 'none';
          }
        }
        
        // Smooth transition trigger
        if (tabSwitchTimeout) clearTimeout(tabSwitchTimeout);
        activeView.classList.remove('show');

        tabSwitchTimeout = setTimeout(() => {
          activeView.classList.remove('active');
          targetView.classList.add('active');

          // Force reflow so the transition from display:none to display:block is registered
          targetView.offsetWidth;

          targetView.classList.add('show');
          tabSwitchTimeout = null;
        }, 200);
      });
    });

    // Toggle simulation settings widget drawer
    simHeader.addEventListener('click', () => {
      sound.playClick();
      const isCollapsed = simDrawer.classList.toggle('collapsed');
      simHeader.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
    });

    const MAX_LOG_ENTRIES = 100;

    // Logging helper inside PN532 console display
    function logNfc(message, isSuccess = false) {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const timestamp = `[${hrs}:${mins}:${secs}]`;

      const entry = document.createElement('div');
      entry.className = 'nfc-log-entry' + (isSuccess ? ' auth-success' : '');
      entry.textContent = `${timestamp} ${message}`;

      nfcLogsArea.appendChild(entry);

      while (nfcLogsArea.children.length > MAX_LOG_ENTRIES) {
        nfcLogsArea.removeChild(nfcLogsArea.firstChild);
      }

      nfcLogsArea.scrollTop = nfcLogsArea.scrollHeight;
    }

    // NFC Card tag simulation triggers
    btnSimNfc.addEventListener('click', () => {
      sound.playClick();
      
      if (chargingState === 'alarm') {
        showNotice("경보 상태: 카드 등록 불가");
        return;
      }

      if (chargingState === 'charging') {
        showNotice("충전 중에는 카드 인증이 불가합니다");
        return;
      }

      // Random mock card hex UID
      const uids = ["4A 8B C3 F2", "D1 82 9A 40", "04 7F A3 B2"];
      const randomUid = uids[Math.floor(Math.random() * uids.length)];
      
      sound.playNfcChime();
      isNfcScanned = true;
      
      logNfc(`[NFC] 스마트 카드 인식 감지 (UID: ${randomUid})`);
      logNfc(`[인증 결과] 사용자 스마트 카드 인증 성공 - 충전 대기`, true);
      
      showNotice("NFC 카드 인증 완료");
      
      // Update Settings Page Card value
      document.getElementById('rowManageNfc').querySelector('.settings-row-value').innerHTML = `
        UID: ${randomUid}
        <svg style="width: 14px; height: 14px; color: var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      `;
      
      // Pivot charging state
      if (chargingState === 'standby' || chargingState === 'ready_to_charge') {
        if (isAligned) {
          setChargingState('ready_to_charge');
          if (chargeStartTimeout) clearTimeout(chargeStartTimeout);
          chargeStartTimeout = setTimeout(() => {
            chargeStartTimeout = null;
            startChargingSession();
          }, 600);
        } else {
          logNfc("[인증 보류] 주차 정위치 오류: 차량 주차 위치를 맞춰주세요.");
          document.querySelector('.phone-container').classList.add('align-warning-active');
          dlgAlignWarning.show();
        }
      }
    });

    // Coil Proximity Switch toggling
    function onAlignmentChanged(aligned) {
      isAligned = aligned;

      if (chargingState === 'alarm') return;

      if (isAligned) {
        alignmentDot.className = 'alignment-dot aligned';
        alignmentText.textContent = '정위치 주차 완료';
        carStatusBadge.className = 'badge blue';
        carStatusBadge.textContent = '대기 중';
        carStatusSubText.textContent = '무선 충전 주차 구역에 올바르게 주차되어 있어요';

        document.querySelector('.phone-container').classList.remove('align-warning-active');
        if (dlgAlignWarning.open) {
          dlgAlignWarning.close();
        }

        if (isNfcScanned) {
          setChargingState('ready_to_charge');
        } else {
          chargeBadge.className = 'badge blue';
          chargeBadge.textContent = '인증 필요';
          chargeHeadline.textContent = '무선 충전을 위해 회원 카드를 NFC 인식기에 접촉해 주세요.';
        }
      } else {
        alignmentDot.className = 'alignment-dot';
        alignmentText.textContent = '주차 위치 이탈 (대기)';
        carStatusBadge.className = 'badge amber';
        carStatusBadge.textContent = '위치 이탈';
        carStatusSubText.textContent = '충전 구역 내 올바른 위치에 차량을 주차해 주세요';

        // Stop charging if alignment is lost
        if (chargingState === 'charging') {
          stopChargingSession('misaligned');
        } else {
          setChargingState('standby');
        }
      }
    }

    chkSimAlign.addEventListener('change', (e) => {
      sound.playClick();
      onAlignmentChanged(e.target.checked);
    });

    btnAlignWarningClose.addEventListener('click', () => {
      sound.playClick();
      document.querySelector('.phone-container').classList.remove('align-warning-active');
      if (dlgAlignWarning.open) {
        dlgAlignWarning.close();
      }
    });

    // Toggle expand/collapse for the 'My Car' card and support swipe gesture
    let carTouchStartY = 0;
    let carTouchEndY = 0;
    const carCard = document.querySelector('.car-card');

    carCard.addEventListener('touchstart', (e) => {
      if (e.target.closest('#btnEditPlate')) return;
      carTouchStartY = e.touches[0].clientY;
      carTouchEndY = carTouchStartY;
    }, { passive: true });

    carCard.addEventListener('touchmove', (e) => {
      if (e.target.closest('#btnEditPlate')) return;
      carTouchEndY = e.touches[0].clientY;
    }, { passive: true });

    carCard.addEventListener('touchend', (e) => {
      if (e.target.closest('#btnEditPlate')) return;
      const swipeDistance = carTouchEndY - carTouchStartY;
      
      if (swipeDistance > 30) { // Swipe Down
        if (!carCard.classList.contains('expanded')) {
          carCard.classList.add('expanded');
          sound.playClick();
        }
      } else if (swipeDistance < -30) { // Swipe Up
        if (carCard.classList.contains('expanded')) {
          carCard.classList.remove('expanded');
          sound.playClick();
        }
      }
    });

    carCard.addEventListener('click', (e) => {
      // Exclude '변경' button so it doesn't toggle accordion
      if (e.target.closest('#btnEditPlate')) return;
      
      // If it was a touch movement, ignore click to avoid double-firing or conflicting with swipe
      const touchDiff = Math.abs(carTouchEndY - carTouchStartY);
      if (touchDiff > 10) return;
      
      carCard.classList.toggle('expanded');
      sound.playClick();
    });

    // License Plate Modal triggers
    btnEditPlate.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering car-card click event
      sound.playClick();
      document.querySelector('.phone-container').classList.add('plate-input-active');
      dlgPlateInput.show();
    });

    btnPlateInputCancel.addEventListener('click', () => {
      sound.playClick();
      document.querySelector('.phone-container').classList.remove('plate-input-active');
      dlgPlateInput.close();
    });

    btnPlateInputSave.addEventListener('click', () => {
      sound.playClick();
      const newPlate = iptCarPlate.value.trim().toUpperCase();
      if (newPlate) {
        lblRegisteredPlate.textContent = newPlate;
        logNfc(`[차량 등록] 차량 번호판이 '${newPlate}'로 업데이트되었습니다.`);
        showNotice("차량 번호 변경 완료");
      }
      document.querySelector('.phone-container').classList.remove('plate-input-active');
      dlgPlateInput.close();
    });

    // Sliding controllers for Temperature
    rngSimTemp.addEventListener('input', (e) => {
      temperatureVal = parseFloat(e.target.value);
      lblSimTemp.textContent = `${temperatureVal.toFixed(1)}°C`;
      valTemp.textContent = temperatureVal.toFixed(1);
      checkSafetyThresholds();
    });

    // Sliding controllers for Smoke
    rngSimSmoke.addEventListener('input', (e) => {
      smokeVal = parseInt(e.target.value);
      lblSimSmoke.textContent = `${smokeVal} ppm`;
      valSmoke.textContent = smokeVal;
      checkSafetyThresholds();
    });

    // Main Charging State Engine
    function setChargingState(state) {
      if (chargingState === 'alarm' && state !== 'standby') return;
      
      chargingState = state;
      
      if (state === 'standby') {
        chargeBadge.className = 'badge amber';
        chargeBadge.textContent = '대기 중';
        chargeHeadline.textContent = '올바른 주차 위치 확인 및 NFC 인증을 대기하고 있습니다.';
        btnAction.className = 'toss-btn disabled';
        btnAction.textContent = 'NFC 인증 완료 시 충전 가능';
        chargeProgressTrack.style.display = 'none';

        valPower.textContent = '0.0';
        valTime.textContent = '--';

        valRelay.className = 'badge green';
        valRelay.textContent = '대기 (안전)';
        lblRelayDetail.textContent = '전원 공급 대기 중';
        
        cybertruckImg.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))';
      } else if (state === 'ready_to_charge') {
        chargeBadge.className = 'badge blue';
        chargeBadge.textContent = '충전 준비 완료';
        chargeHeadline.textContent = '무선 연결에 성공했습니다. 충전을 시작할 수 있습니다.';
        btnAction.className = 'toss-btn';
        btnAction.textContent = '무선 충전 시작하기';
        chargeProgressTrack.style.display = 'none';
      } else if (state === 'charging') {
        chargeBadge.className = 'badge green';
        chargeBadge.textContent = '충전 중';
        chargeHeadline.textContent = '차량에 전력을 안전하게 공급하고 있습니다.';
        btnAction.className = 'toss-btn danger';
        btnAction.textContent = '충전 중단하기';
        chargeProgressTrack.style.display = 'block';
        
        valRelay.className = 'badge blue';
        valRelay.textContent = '공급 중';
        lblRelayDetail.textContent = '전원 공급 중: 무선 전송 중';
        
        cybertruckImg.style.filter = 'drop-shadow(0 8px 24px rgba(49, 130, 246, 0.25))';
      }
    }

    // Toggle button event click
    btnAction.addEventListener('click', () => {
      sound.playClick();
      if (chargingState === 'ready_to_charge') {
        startChargingSession();
      } else if (chargingState === 'charging') {
        stopChargingSession('user');
      } else if (chargingState === 'standby') {
        if (!isAligned) {
          document.querySelector('.phone-container').classList.add('align-warning-active');
          dlgAlignWarning.show();
        } else {
          showNotice("NFC 카드를 먼저 태그해 주세요");
        }
      }
    });

    function startChargingSession() {
      if (chargingState !== 'ready_to_charge') return;

      if (chargeStartTimeout) {
        clearTimeout(chargeStartTimeout);
        chargeStartTimeout = null;
      }

      setChargingState('charging');
      chargeStartTime = new Date();
      chargeStartBattery = batteryLevel;
      logNfc('[충전 개시] 안전 전원 공급 장치 활성화 완료');
      logNfc('[충전소] 무선 충전 전원 전송 시작');

      if (chargingTimer) clearInterval(chargingTimer);
      
      chargeCyclePower = 7.2;
      valPower.textContent = chargeCyclePower.toFixed(1);

      chargingTimer = setInterval(() => {
        if (batteryLevel >= 100) {
          batteryLevel = 100;
          stopChargingSession('completed');
          return;
        }

        batteryLevel += 1;
        currentRange = Math.floor(batteryLevel * 5.63);

        valBattery.textContent = batteryLevel;
        valRange.textContent = currentRange;
        statusBatteryFill.style.width = `${batteryLevel}%`;

        chargeProgressBar.style.width = `${batteryLevel}%`;

        const minsLeft = Math.ceil((100 - batteryLevel) * 0.8);
        valTime.textContent = `${minsLeft}분 남음`;

      }, 1000);
    }

    function stopChargingSession(reason = 'user') {
      if (chargingState !== 'charging') return;
      
      if (chargingTimer) clearInterval(chargingTimer);
      
      // Record charge history
      if (chargeStartTime) {
        const kWhUsed = ((batteryLevel - chargeStartBattery) * 0.55).toFixed(1);
        const costKRW = Math.round(kWhUsed * 265);
        const spotNum = Math.floor(Math.random() * 3) + 1;
        const now = new Date();
        const dateStr = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')} ${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;

        if (parseFloat(kWhUsed) > 0) {
          chargeHistory.unshift({
            spot: `무선 충전 ${spotNum}호기`,
            date: dateStr,
            kWh: kWhUsed,
            cost: `₩${costKRW.toLocaleString()}`
          });
          renderChargeHistory();
        }
        chargeStartTime = null;
      }
      
      if (reason === 'user') {
        setChargingState('ready_to_charge');
        logNfc('[충전 중단] 사용자 취소 요청으로 수동 정지');
        if (btnSimRetryCharge) btnSimRetryCharge.style.display = 'block';
      } else if (reason === 'misaligned') {
        setChargingState('standby');
        logNfc('[충전 중단] 주차 위치 이탈 감지로 인한 자동 안전 차단');
        if (btnSimRetryCharge) btnSimRetryCharge.style.display = 'none';
      } else if (reason === 'completed') {
        setChargingState('ready_to_charge');
        logNfc('[충전 완료] 배터리 충전 100% 도달로 인한 자동 종료');
        showNotice("충전 완료");
        if (btnSimRetryCharge) btnSimRetryCharge.style.display = 'block';
      }
    }

    function renderChargeHistory() {
      const container = document.getElementById('historyListGroup');
      const emptyEl = document.getElementById('historyEmpty');
      if (emptyEl) emptyEl.remove();
      
      // Remove existing items and rebuild
      container.querySelectorAll('.history-item').forEach(el => el.remove());
      
      chargeHistory.slice(0, 10).forEach(item => {
        const el = document.createElement('div');
        el.className = 'history-item';
        el.innerHTML = `
          <div class="history-item-left">
            <span class="title">${item.spot}</span>
            <span class="date">${item.date}</span>
          </div>
          <div class="history-item-right">
            <span class="val">${item.kWh} kWh</span>
            <span class="cost">${item.cost}</span>
          </div>`;
        container.appendChild(el);
      });

      // Update summary metrics
      const totalCount = chargeHistory.length;
      const totalKWh = chargeHistory.reduce((sum, h) => sum + parseFloat(h.kWh), 0);
      const totalKm = Math.round(totalKWh * 5.63);
      const avgKWh = totalCount > 0 ? (totalKWh / totalCount).toFixed(1) : 0;

      const elCount = document.getElementById('metricCount');
      const elKWh = document.getElementById('metricKWh');
      const elKm = document.getElementById('metricKm');
      const elAvg = document.getElementById('metricAvg');
      if (elCount) elCount.innerHTML = `${totalCount}<span class="unit">회</span>`;
      if (elKWh) elKWh.innerHTML = `${totalKWh.toFixed(1)}<span class="unit">kWh</span>`;
      if (elKm) elKm.innerHTML = `${totalKm.toLocaleString()}<span class="unit">km</span>`;
      if (elAvg) elAvg.innerHTML = `${avgKWh}<span class="unit">kWh</span>`;
    }

    function retryCharging() {
      sound.playClick();
      if (chargingState === 'ready_to_charge' && isAligned) {
        // Reset battery for a fresh charging session
        batteryLevel = 20;
        currentRange = Math.floor(batteryLevel * 5.63);
        valBattery.textContent = batteryLevel;
        valRange.textContent = currentRange;
        statusBatteryFill.style.width = `${batteryLevel}%`;
        chargeProgressBar.style.width = `${batteryLevel}%`;
        valTime.textContent = `${Math.ceil((100 - batteryLevel) * 0.8)}분 남음`;

        startChargingSession();
        if (btnSimRetryCharge) btnSimRetryCharge.style.display = 'none';
        logNfc('[충전 재개] 관리자 제어판에서 충전 다시하기 실행');
        showNotice("충전 다시하기 실행");
      } else if (!isAligned) {
        showNotice("정위치 주차 후 재시도해 주세요");
        logNfc('[충전 재시도 불가] 차량 주차 위치 이탈');
      } else {
        showNotice("NFC 인증 후 재시도해 주세요");
      }
    }

    // Safety rules trigger checking
    function checkSafetyThresholds() {
      // Alarm thresholds: Temp > 45C OR Smoke > 300 ppm
      const isTempCritical = temperatureVal >= 45.0;
      const isSmokeCritical = smokeVal >= 300;
      
      if (chargingState === 'alarm') {
        if (dlgEmergency.open) {
          updateEmergencyModal(isTempCritical, isSmokeCritical);
        }
        return;
      }

      if (isTempCritical || isSmokeCritical) {
        triggerEmergencyState(isTempCritical, isSmokeCritical);
      } else {
        safetyBadge.className = 'badge green';
        safetyBadge.textContent = '안전';
        safetyHeadline.textContent = '화재 감지 및 안전 상태 진단 중';
        cardSafety.style.backgroundColor = 'var(--bg-card)';
        
        lblTempDetail.textContent = '측정 온도 정상 범위';
        lblSmokeDetail.textContent = '대기질 양호 및 연기 없음';
        
        if (chargingState !== 'charging') {
          valRelay.className = 'badge green';
          valRelay.textContent = '대기 (안전)';
          lblRelayDetail.textContent = '전원 공급 대기 중';
        }
      }
    }

    function updateEmergencyModal(tempAlert, smokeAlert) {
      const tempRow = document.getElementById('dlgEmergencyTempRow');
      const smokeRow = document.getElementById('dlgEmergencySmokeRow');
      const tempValEl = document.getElementById('dlgEmergencyTempVal');
      const smokeValEl = document.getElementById('dlgEmergencySmokeVal');
      
      tempValEl.textContent = `${temperatureVal.toFixed(1)}°C`;
      smokeValEl.textContent = `${smokeVal} ppm`;

      if (tempAlert) {
        tempRow.style.backgroundColor = 'var(--toss-red-light)';
        tempRow.style.color = 'var(--toss-red)';
        tempValEl.style.color = 'var(--toss-red)';
      } else {
        tempRow.style.backgroundColor = '#f9fafb';
        tempRow.style.color = 'var(--text-primary)';
        tempValEl.style.color = 'var(--text-primary)';
      }

      if (smokeAlert) {
        smokeRow.style.backgroundColor = 'var(--toss-red-light)';
        smokeRow.style.color = 'var(--toss-red)';
        smokeValEl.style.color = 'var(--toss-red)';
      } else {
        smokeRow.style.backgroundColor = '#f9fafb';
        smokeRow.style.color = 'var(--text-primary)';
        smokeValEl.style.color = 'var(--text-primary)';
      }

      if (tempAlert || smokeAlert) {
        btnEmergencyReset.className = 'toss-btn disabled';
        btnEmergencyReset.textContent = '안전 상태 확인 중...';
        btnEmergencyReset.disabled = true;
        btnSimResetAlert.style.display = 'none';
      } else {
        btnEmergencyReset.className = 'toss-btn danger';
        btnEmergencyReset.textContent = '비상 상황 해제';
        btnEmergencyReset.disabled = false;
        btnSimResetAlert.style.display = 'block';
      }
    }

    function triggerEmergencyState(tempAlert, smokeAlert) {
      if (chargingTimer) clearInterval(chargingTimer);
      
      chargingState = 'alarm';
      
      // Play high pitch Web Audio warning siren loop
      sound.startBuzzerAlarm();
      
      // Update safety UI Card styles
      safetyBadge.className = 'badge red';
      safetyBadge.textContent = '위험 (경보)';
      cardSafety.style.backgroundColor = 'var(--toss-red-light)';
      
      if (tempAlert && smokeAlert) {
        safetyHeadline.textContent = '⚠️ 충전 패드 고온 및 연기 동시 감지!';
        lblTempDetail.innerHTML = '<span style="color:var(--toss-red); font-weight:700;">[위험] 온도 수치 극도로 높음 (45°C 이상)</span>';
        lblSmokeDetail.innerHTML = '<span style="color:var(--toss-red); font-weight:700;">[위험] 연기 감지 농도 초과 (300ppm 초과)</span>';
      } else if (tempAlert) {
        safetyHeadline.textContent = '⚠️ 충전 패드 고온 경보 감지!';
        lblTempDetail.innerHTML = '<span style="color:var(--toss-red); font-weight:700;">[경고] 충전 패드 과열 감지 (45°C 이상)</span>';
      } else {
        safetyHeadline.textContent = '⚠️ 충전 패드 주변 연기 감지!';
        lblSmokeDetail.innerHTML = '<span style="color:var(--toss-red); font-weight:700;">[경고] 연기 농도 초과 (300ppm 초과)</span>';
      }

      // Open relay immediately to prevent fire
      valRelay.className = 'badge red';
      valRelay.textContent = '차단됨 (비상)';
      lblRelayDetail.innerHTML = '<span style="color:var(--toss-red); font-weight:700;">전원 공급 차단: 안전 전력 긴급 차단</span>';
      
      // Turn active charge displays off
      chargeBadge.className = 'badge red';
      chargeBadge.textContent = '충전 불가';
      chargeHeadline.textContent = '긴급 위험 감지로 인해 무선 충전 패드의 전원이 자동 차단되었습니다.';
      btnAction.className = 'toss-btn disabled';
      btnAction.textContent = '위험 감지로 인해 충전 제한됨';
      chargeProgressTrack.style.display = 'none';
      
      valPower.textContent = '0.0';
      valTime.textContent = '차단됨';
      
      // Dynamic header welcome text update if we are on Home page
      const currentActiveTab = document.querySelector('.nav-tab-btn.active').getAttribute('data-tab');
      if (currentActiveTab === 'Home') {
        headerWelcome.innerHTML = `<span style="color:var(--toss-red);">위험 감지</span> 충전 차단됨`;
      }
      
      cybertruckImg.style.filter = 'drop-shadow(0 8px 16px rgba(240,68,56,0.25))';
      
      // Open red emergency alert popup relative to the phone container
      dlgEmergency.show();
      document.querySelector('.phone-container').classList.add('alarm-active');
      
      updateEmergencyModal(tempAlert, smokeAlert);
      
      logNfc(`[경보 발령] ${tempAlert ? '패드 과열' : ''} ${smokeAlert ? '주변 연기' : ''} 안전 수치 초과!`);
      logNfc('[긴급 차단] 충전 패드 전원 공급 강제 차단 완료', true);
      logNfc('[경보 조치] 스마트 충전기 비상 경보음 출력 개시');
      
      showNotice("비상 경보 감지: 전원 차단");

      // Hide retry button during alarm
      if (btnSimRetryCharge) btnSimRetryCharge.style.display = 'none';
    }

    // Reset Alarm Button Actions
    function resetAlarmState() {
      sound.playClick();
      sound.stopBuzzerAlarm();
      
      if (dlgEmergency.open) {
        dlgEmergency.close();
      }
      document.querySelector('.phone-container').classList.remove('alarm-active');
      
      const currentActiveTab = document.querySelector('.nav-tab-btn.active').getAttribute('data-tab');
      if (currentActiveTab === 'Home') {
        headerWelcome.innerHTML = `안녕하세요, 게스트님`;
      }
      
      chargingState = 'standby';
      isNfcScanned = false;

      if (chargeStartTimeout) {
        clearTimeout(chargeStartTimeout);
        chargeStartTimeout = null;
      }

      logNfc('[경보 해제] 시스템 정상 복구 완료');
      logNfc('[시스템] 스마트 카드 태그 대기 상태 진입');

      chkSimAlign.checked = true;
      onAlignmentChanged(true);

      btnSimResetAlert.style.display = 'none';
      showNotice("경보 해제 완료");
    }

    btnSimResetAlert.addEventListener('click', resetAlarmState);
    btnEmergencyReset.addEventListener('click', resetAlarmState);

    document.getElementById('btnEmergencyClose').addEventListener('click', () => {
      sound.playClick();
      if (dlgEmergency.open) dlgEmergency.close();
    });

    // Retry Charging button handler
    if (btnSimRetryCharge) {
      btnSimRetryCharge.addEventListener('click', retryCharging);
    }

    // MAP INTERACTION SYSTEM
    mapPins.forEach((pin, index) => {
      pin.addEventListener('click', () => {
        sound.playClick();
        const spotId = index + 1;
        
        // Remove selection from all cards
        mapCards.forEach(c => c.classList.remove('selected'));
        
        // Select matching card
        const targetCard = document.getElementById(`spotCard${spotId}`);
        targetCard.classList.add('selected');
        
        // Scroll card into view inside map view
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        showNotice(`무선 충전 ${spotId}호기 선택됨`);
      });
    });

    mapCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        sound.playClick();
        const spotId = index + 1;
        
        mapCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        // Visual effect on corresponding Pin
        const pin = document.getElementById(`mapPin${spotId}`);
        pin.style.transform = 'scale(1.3) translate(0, -5px)';
        setTimeout(() => pin.style.transform = 'scale(1)', 400);
        
        showNotice(`무선 충전 ${spotId}호기 선택됨`);
      });
    });

    // Default startup triggers
    chkSimAlign.dispatchEvent(new Event('change'));
    
    // Battery level setup in status bar
    statusBatteryFill.style.width = '85%';

    // Theme toggle
    const chkThemeDark = document.getElementById('chkThemeDark');
    const themeDetail = document.getElementById('themeDetail');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('neo-charge-theme') || 'light';
    if (savedTheme === 'dark') {
      document.querySelector('.phone-container').setAttribute('data-theme', 'dark');
      chkThemeDark.checked = true;
      themeDetail.textContent = '다크 모드';
    }

    chkThemeDark.addEventListener('change', () => {
      sound.playClick();
      const container = document.querySelector('.phone-container');
      if (chkThemeDark.checked) {
        container.setAttribute('data-theme', 'dark');
        themeDetail.textContent = '다크 모드';
        localStorage.setItem('neo-charge-theme', 'dark');
      } else {
        container.removeAttribute('data-theme');
        themeDetail.textContent = '라이트 모드';
        localStorage.setItem('neo-charge-theme', 'light');
      }
    });

