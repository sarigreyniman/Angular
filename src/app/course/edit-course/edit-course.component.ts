import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { learningWay } from '../course.model';
import { Lecturer } from '../../lecturer/lecturer.model';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { LecturerService } from '../../lecturer/lecturer.service';

@Component({
  selector: 'app-edit-course',
  standalone: false,
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent{

  editCourseForm: FormGroup;
  courseId!: number;

  learningWays = Object.keys(learningWay).filter(k => typeof learningWay[k as any] === "number");

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.editCourseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      categoryId: ['', Validators.required],
      severalLessons: ['', Validators.required],
      startDate: ['', Validators.required],
      syllabus: [''],
      throughLearning: ['', Validators.required],
      lecturerId: ['', Validators.required],
      imgURL: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.getCourseById(this.courseId);
    });
  }

  getCourseById(id: number): void {
    this.courseService.getCourseById(id).subscribe((course: Course) => {
      this.editCourseForm.patchValue(course);
    });
  }

  onSubmit(): void {
    if (this.editCourseForm.invalid) {
      return;
    }
    const editedCourse: Course = { ...this.editCourseForm.value, courseCode: this.courseId };
  this.courseService.save(editedCourse)
    console.log("Course updated successfully");
    this.router.navigate(['/all-courses']);
  }










  // selectedCategory!: string;
  // categories!: Category[];
  // private _currentCourse!: Course;

  // public get course(): Course {
  //   return this._currentCourse;
  // }
  // MyFormGroup: FormGroup = new FormGroup({
  //   "nameCourse": new FormControl('', [Validators.required]),
  //   "kodeKategory": new FormControl('', [Validators.required]),
  //   "amountLessons": new FormControl('', [Validators.required, Validators.min(1)]),
  //   "startCourseDate": new FormControl('', [Validators.required]),
  //   "syllabusArr": this.fb.array([]), // שימוש ב-FormArray כאן
  //   "wayLearning": new FormControl('', [Validators.required]),
  //   "image": new FormControl('', [Validators.required])
  // });

  // public set course(course: Course) {
   
  // }

  // courseToSave!: Course;
  // lect!: Lecturer;
  // saveCourse() {
  //   this.videosArr = this.MyFormGroup.value['syllabusArr'].filter(video => video.trim() !== '');

  //   this.categories.forEach(category => {
  //     if (category.name == this.MyFormGroup.value["kodeKategory"])
  //       this.MyFormGroup.value["kodeKategory"] = category._id;
  //   })

  //   this.courseToSave = new Course(this.MyFormGroup.value["courseName"], this.MyFormGroup.value["CategoryId"], this.MyFormGroup.value["amountLessons"],
  //     this.MyFormGroup.value["startDate"], this.MyFormGroup.value["syllabus"], this.MyFormGroup.value["wayLearning"],
  //     this.lect._id,
  //      this.MyFormGroup.value["imgURL"]);

  //   this._courseService.save(this.courseToSave, this.courseId).subscribe();
  //   alert("Course was added successfully!")
  //   this._router.navigate(['/all-courses'])
  // }

  // constructor(private _router: Router,
  //   private _courseService: CourseService,
  //   private _categoryService: CategoryService,
  //   private _lecture: LecturerService,
  //   private _accr: ActivatedRoute,
  //   private fb:FormBuilder) {
  //   this._categoryService.getCategory().subscribe(res => {
  //     this.categories = res;
  //   }, (err => {
  //     console.log(err);
  //   }))
  // }

  // courseId!: string;
  // ngOnInit(): void {
  //   this._accr.paramMap.subscribe(paramMap => {
  //     if (paramMap.has("id")) {
  //       this.courseId = paramMap.get("id");
  //       this._courseService.getCourseById(paramMap.get("id")).subscribe(course => {
  //         this.course = course;
  //         this.MyFormGroup.patchValue({
  //           "nameCourse": this._currentCourse.courseName,
  //           "kodeKategory": this._currentCourse.categoryId,
  //           "amountLessons": this._currentCourse.throughLearning,
  //           "startCourseDate": this._currentCourse.startDate,
  //           "syllabusArr": this._currentCourse.sillybus,
  //           "wayLearning": this.getwayLearning(),
  //           "kodeLecture": "",
  //           "image": this._currentCourse.imgURL
  //         });
          
  //         const videosArr = this.MyFormGroup.get('syllabusArr') as FormArray;
  //         this._currentCourse.sillybus.forEach(video => {
  //           videosArr.push(this.fb.control(video));
  //         });
        
  //       })
  //     }
  //   })
  // }
  // getwayLearning() {
  //   if (String(this._currentCourse.throughLearning) == "zoom")
  //     return "zoom"
  //   return "frontaly"
  // }
  // videosArr!: string[]
  // addVideo() {
  //   const videosArr = this.MyFormGroup.get('syllabusArr') as FormArray;
  //   videosArr.push(this.fb.control(''));
  // }

  // removeVideo(index: number) {
  //   const videosArr = this.MyFormGroup.get('syllabusArr') as FormArray;
  //   videosArr.removeAt(index);
  // }

}
