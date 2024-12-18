import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { httpsCallable } from 'firebase/functions';
import { DashboardService } from 'src/app/service/dashboard.service';
import { LocalStorageService } from 'src/app/service/localstorage.service';
import { PaystackService } from 'src/app/service/paystack.service';
import { SharedService } from 'src/app/service/shared.service';
import { UsersService } from 'src/app/service/users.service';
import { firebaseFunctions } from 'src/configurations/firebase-config';
import { ITutor } from '../students/student.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('toggleAnimation', [
        transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
        transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
],
})
export class DashboardComponent {
    store: any;
    bitcoin: any;
    ethereum: any;
    litecoin: any;
    binance: any;
    tether: any;
    solana: any;
    isLoading :any;
    totalStudents:number = 0;
    totalTutors:number = 0;
    totalWithdrawRequests:number = 0;
    paystackBalance!:any
    tab2='students';
    tutors!:ITutor[];
    role!:string;
    
    constructor(public storeData: Store<any>, 
        private dashboardService: DashboardService,
        private sharedService:SharedService,
        private usersService:UsersService,
        private pay: PaystackService,
        private localStore: LocalStorageService) {
        this.initStore();
    }

    ngOnInit(): void {
        this.isLoading=true;
        this.loadData();
      }




    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                const hasChangeTheme = this.store?.theme !== d?.theme;
                const hasChangeLayout = this.store?.layout !== d?.layout;
                const hasChangeMenu = this.store?.menu !== d?.menu;
                const hasChangeSidebar = this.store?.sidebar !== d?.sidebar;

                this.store = d;

                if (hasChangeTheme || hasChangeLayout || hasChangeMenu || hasChangeSidebar) {
                    if (this.isLoading || hasChangeTheme) {
                        this.initCharts(); //init charts
                    } else {
                        setTimeout(() => {
                            this.initCharts(); // refresh charts
                        }, 300);
                    }
                }
            });
    }

    initCharts() {
        // bitcoin
        this.bitcoin = {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
            series: [
                {
                    data: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66],
                },
            ],
        };

        // ethereum
        this.ethereum = {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
            series: [
                {
                    data: [44, 25, 59, 41, 66, 25, 21, 9, 36, 12],
                },
            ],
        };

        // litecoin
        this.litecoin = {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
            series: [
                {
                    data: [9, 21, 36, 12, 66, 25, 44, 25, 41, 59],
                },
            ],
        };

        // binance
        this.binance = {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
            series: [
                {
                    data: [25, 44, 25, 59, 41, 21, 36, 12, 19, 9],
                },
            ],
        };

        // tether
        this.tether = {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
            series: [
                {
                    data: [21, 59, 41, 44, 25, 66, 9, 36, 25, 12],
                },
            ],
        };

        // solana
        this.solana = {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
            series: [
                {
                    data: [21, -9, 36, -12, 44, 25, 59, -41, 66, -25],
                },
            ],
        };
    }

    async loadData() {
        this.role = this.localStore.get('admin').role
        try {
          this.totalStudents = await this.dashboardService.getUsersTotal('Student');
          this.tutors = await this.usersService.getUsers('Tutor')
           this.pay.checkPayStackBalance().subscribe((res)=> {
            let balance = res.data[0]?.balance / 100
            this.paystackBalance = balance
            console.log(res.data[0])
           })
          this.totalTutors = this.tutors.length;
          this.totalWithdrawRequests = await this.dashboardService.getRequestsTotal();
          this.isLoading=false;
        } catch (error) {
            this.isLoading=false;
          console.error('Error loading users:', error);
        }
      }


}
