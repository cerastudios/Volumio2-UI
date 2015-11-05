class AirplayScreemDirective {
  constructor() {
    'ngInject';
    let directive = {
      restrict: 'E',
      scope: false,
      template: '<div id="airplayScrim" ng-click="airplayScrim.openScrimModal()"></div>',
      controller: AirplayScrimController,
      controllerAs: 'airplayScrim'
    };
    return directive;
  }
}

class AirplayScrimController {
  constructor($rootScope, socketService, $document, modalService) {
    'ngInject';
    this.socketService = socketService;
    this.$document = $document[0];
    this.modalService = modalService;

    this.init();
    $rootScope.$on('socket:init', () => {
      this.init();
    });
  }

  init() {
    this.registerListner();
    this.initService();
  }

  registerListner() {
    this.socketService.on('pushAirplay', (data) => {
      if (data.service === 'airplay') {
        this.$document.querySelector('#airplayScrim').classList.add('showScrim');
      } else {
        this.$document.querySelector('#airplayScrim').classList.remove('showScrim');
      }
    });
  }

  openScrimModal() {
    this.modalService.openModal(
      'ModalGotitController',
      'app/components/modal-gotit/modal-gotit.html',
      {title: 'Airplay', message: 'All functionalities will be resumed upon Airplay stop'});
  }

  initService() {
  }
}

export default AirplayScreemDirective;
