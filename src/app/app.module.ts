import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Routes
import { routes } from './app.route';

import { AppComponent } from './app.component';

// service
import { AppService } from './service/app.service';

// store
import { StoreModule } from '@ngrx/store';
import { indexReducer } from './store/index.reducer';

// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// perfect-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// apexchart
import { NgApexchartsModule } from 'ng-apexcharts';

// highlightjs
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

// tippy
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// headlessui
import { MenuModule } from 'headlessui-angular';

// modal
import { ModalModule } from 'angular-custom-modal';

// sortable
import { SortablejsModule } from '@dustfoundation/ngx-sortablejs';

// quill editor
import { QuillModule } from 'ngx-quill';

// dashboard
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// widgets
import { WidgetsComponent } from './widgets';

// tables
import { TablesComponent } from './tables';

// font-icons
import { FontIconsComponent } from './font-icons';

// charts
import { ChartsComponent } from './charts';

// dragndrop
import { DragndropComponent } from './dragndrop';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';

// Layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

import { HeaderComponent } from './layouts/header';
import { FooterComponent } from './layouts/footer';
import { SidebarComponent } from './layouts/sidebar';
import { ThemeCustomizerComponent } from './layouts/theme-customizer';
import { IconModule } from './shared/icon/icon.module';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './service/auth.service';
import { FormateDatePipe } from './pipes/formate-date.pipe';
import { PaymentComponent } from './pages/payment/payment.component';
import { LongTermRequestsComponent } from './pages/long-term-requests/long-term-requests.component';
import { LiveRequestDetailComponent } from './pages/long-term-requests/live-request-detail/live-request-detail.component';
import { LiveIcon } from './components/live-request.icon';
import { QaRequestsComponent } from './pages/qa-requests/qa-requests.component';
import { QaDetailComponent } from './pages/qa-requests/qa-detail/qa-detail.component';
import { NoteIcon } from './components/document.icon';
import { UserAccountSettingsComponent } from './users/user-account-settings';
import { UsersModule } from './users/user.module';
import { AdminPaystackComponent } from './pages/dashboard/admin-paystack/admin-paystack.component';
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        BrowserModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
        }),
        MenuModule,
        StoreModule.forRoot({ index: indexReducer }),
        NgxTippyModule,
        NgApexchartsModule,
        NgScrollbarModule.withConfig({
            visibility: 'hover',
            appearance: 'standard',
        }),
        HighlightModule,
        SortablejsModule,
        ModalModule,
        QuillModule.forRoot(),
        IconModule,
        SharedModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        ThemeCustomizerComponent,
        TablesComponent,
        FontIconsComponent,
        ChartsComponent,
        WidgetsComponent,
        DragndropComponent,
        AppLayout,
        AuthLayout,
        KnowledgeBaseComponent,
        FaqComponent,
        DashboardComponent,
        FormateDatePipe,
        PaymentComponent,
        LongTermRequestsComponent,
        LiveRequestDetailComponent,
        QaDetailComponent,
        NoteIcon,
        QaRequestsComponent,
        // UserAccountSettingsComponent,

        LiveIcon,
        AdminPaystackComponent,
     ],
    providers: [
        AppService,
        AuthService,
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                languages: {
                    json: () => import('highlight.js/lib/languages/json'),
                    typescript: () => import('highlight.js/lib/languages/typescript'),
                    xml: () => import('highlight.js/lib/languages/xml'),
                },
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
