import { Injectable } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { XmlHttpRequestHelper } from '@shared/helpers/XmlHttpRequestHelper';

@Injectable()
export class AppAuthService {

    logout(reload?: boolean, returnUrl?: string): void {
        let customHeaders = {
            [abp.multiTenancy.tenantIdCookieName]: abp.multiTenancy.getTenantIdCookie(),
            'Authorization': 'Bearer ' + abp.auth.getToken()
        };

        XmlHttpRequestHelper.ajax(
            'GET',
            AppConsts.remoteServiceBaseUrl + '/api/TokenAuth/LogOut',
            customHeaders,
            null,
            () => {
                abp.auth.clearToken();
                abp.auth.clearRefreshToken();
                abp.utils.setCookieValue(AppConsts.authorization.encrptedAuthTokenName, undefined, undefined, abp.appPath);

                if (reload !== false) {
                    if (returnUrl) {
                        location.href = returnUrl;
                    } else {
                        location.href = '';
                    }
                }
            }
        );
    }
}
