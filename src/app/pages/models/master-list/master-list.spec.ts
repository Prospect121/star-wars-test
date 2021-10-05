import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MasterList } from './master-list';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

class MasterComponent extends MasterList {

    constructor(protected starWarsStore: Store<{StarWarsState: any}>) {
        super(starWarsStore);
    }
}

describe('Master list model', () => {
    let masterComponent: MasterComponent;
    let crudderResponse = {
        content: [],
        totalElements: 2,
        pageable: {
            offset: 0,
            pageSize: 3
        }
    }
    let router: Router;
    let route: ActivatedRoute;

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                
            ],
        })
    );

    beforeEach(() => {
        router = TestBed.inject(Router);
        route = TestBed.inject(ActivatedRoute);
    });

    it('should be created', () => {
        expect(masterComponent).toBeTruthy();
    });


    describe('move pagination', () => {
        let spy: any;

        beforeEach(() => {
            spy = spyOn(masterComponent, 'onPaginationChange');
        });

        it('should go to first page', () => {
            masterComponent.pagination.first = 3;
            masterComponent.goFirst();
            expect(spy).toHaveBeenCalledWith({ pageNumber: 0 });
        });

        it('should go to last page', () => {
            masterComponent.pagination.last = 1;
            masterComponent.pagination.total = 4;
            //masterComponent.totalPages = 5;
            masterComponent.goLast();
            expect(spy).toHaveBeenCalledWith({ pageNumber: 4 });
        });

        it('should go to next page', () => {
            masterComponent.pagination.last = 2;
            masterComponent.pagination.total = 4;
            masterComponent.getPagination.pagination!.pageNumber = 1;
            masterComponent.goNextPage();
            expect(spy).toHaveBeenCalledWith({ pageNumber: 2 });
        });

        it('should go previous page', () => {
            masterComponent.getPagination.pagination!.pageNumber = 3;
            masterComponent.goPreviousPage();
            expect(spy).toHaveBeenCalledWith({ pageNumber: 2 });
        });
    });
});