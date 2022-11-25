#!/usr/bin/env python
# coding: utf-8

# In[1]:


from IDS_Training_Testing import *
from IDS_Bin_Class_Train_Test import *
import sys


# In[3]:


print("Choose type of classification: ")
print("1. Binary Classification")
print("2. Multiclass Classification")

train_data=None
test_data=None

if sys.argv[1]=="bnr":
    train_data=pd.read_csv("bin_class_train_data.csv")
    test_data=pd.read_csv("bin_class_test_data.csv")
else:
    train_data=pd.read_csv("processed_train.csv")
    test_data=pd.read_csv("processed_test.csv")
X_train=train_data.iloc[:, 1:-1]
X_test=test_data.iloc[:, 1:-1]
y_train=train_data.iloc[:, -1]
y_test=test_data.iloc[:, -1]

print("Select supervised-learning model:")
models=[]
models.append("Logistic Regression Classifier")
models.append("Random Forest Classifier")
models.append("Decision Tree Classifier")
models.append("Naive Bayes Classifier")
models.append("AdaBoost Classifier")
models.append("ANN Classifier")

cnt=1
for i in models:
    print(cnt, i)
    cnt=cnt+1

#model_num = input()
model_name=(sys.argv[2])

print("Training ", model_name)
#print("Hyperparameter Selection: ")

y_pred_train=None
y_pred_test=None
clf=None

if model_name=="lgr":
    """
    print("Select Solver: ")
    solver_list=["newton-cg", "lbfgs", "liblinear", "sag", "saga"]
    for i in range(len(solver_list)):
        print(i+1, solver_list[i])
    solver_num=input()
    solver_num=int(solver_num)
    print()
    print("Select penalty type: ")
    penalty_list=["l1", "l2", "elasticnet", "none"]
    for i in range(len(penalty_list)):
        print(i+1, penalty_list[i])
    #penalty_num=input()
    #penalty_num=int(penalty_num)
    print()
    print("Enter maximum number of iterations: ")
    #mx_iter=input()
    #mx_iter=int(mx_iter)
    """
    clf= LogisticRegression(solver=sys.argv[3], penalty=sys.argv[4], max_iter=int(sys.argv[5]))


if model_name=="rfc":
    """
    print("Enter number of estimators: ")
    n_est=input()
    n_est=int(n_est)
    print("Enter maximum depth: ")
    mx_dpth=input()
    mx_dpth=int(mx_dpth)
    print("Enter minimum samples split: ")
    mn_sp=input()
    mn_sp=int(mn_sp)
    print("Enter maximum number of features for splitting: ")
    mx_ft_list=["auto", "sqrt", "log2", "None"]
    for i in range(len(mx_ft_list)):
        print(i+1, mx_ft_list[i])
    mx_ft=input()
    mx_ft=int(mx_ft)
    """
    clf=RandomForestClassifier(n_estimators=int(sys.argv[3]), max_depth=int(sys.argv[4]), min_samples_split=int(sys.argv[5]), max_features=sys.argv[6])


if model_name=="dst":
    """
    print("Select splitting criterion: ")
    crit_list=["gini", "entropy"]
    for i in range(len(crit_list)):
        print(i+1, crit_list[i])
    crit=input()
    crit=int(crit)
    print("Enter maximum depth: ")
    mx_dpth=input()
    mx_dpth=int(mx_dpth)
    print("Enter minimum samples split: ")
    mn_sp=input()
    mn_sp=int(mn_sp)
    print("Enter maximum number of features for splitting: ")
    mx_ft_list=["auto", "sqrt", "log2", "None"]
    for i in range(len(mx_ft_list)):
        print(i+1, mx_ft_list[i])
    mx_ft=input()
    mx_ft=int(mx_ft)
    """
    clf=tree.DecisionTreeClassifier(criterion=sys.argv[3], max_depth=int(sys.argv[4]), min_samples_split=int(sys.argv[5]), max_features=sys.argv[6])


if model_name=="nvb":
    """
    print("Select sub-classifier: ")
    cl_list=["BernoulliNB", "MultinomialNB", "GaussianNB"]
    for i in range(len(cl_list)):
        print(i+1, cl_list[i])
    cl=input()
    cl=int(cl)
    if cl==1:
        clf=BernoulliNB()
    elif cl==2:
        clf=MultinomialNB()
    else:
        clf=GaussianNB()
    """
    clf=sys.argv[3]



if model_name=="adb":
    """
    print("Enter number of estimators: ")
    n_est=input()
    n_est=int(n_est)
    print("Enter value of learning rate: ")
    alpha=input()
    alpha=float(alpha)
    """
    clf=AdaBoostClassifier(n_estimators=int(sys.argv[3]), learning_rate=float(sys.argv[4]))

if model_name=="ann":
    """
    print("Select activation type: ")
    acti_list=["identity", "logistic", "tanh", "relu"]
    for i in range(len(acti_list)):
        print(i+1, acti_list[i])
    acti=int(input())
    print("Select solver type: ")
    solver_list=["lbfgs", "sgd", "adam"]
    for i in range(len(solver_list)):
        print(i+1, solver_list[i])
    sol=int(input())
    print("Enter batch size: ")
    bs=int(input())
    print("Enter maximum number of iterations: ")
    max_iter=int(input())
    alpha=float(sys.argv[7])
    if solver_list[sol-1]=='sgd' or solver_list[sol-1]=='adam':
        print("Enter value of initial learning rate(alpha): ")
        alpha=float(input())
    """
    clf=MLPClassifier(activation=sys.argv[3], solver=sys.argv[4], batch_size=int(sys.argv[5]), max_iter=int(sys.argv[6]), learning_rate_init=float(sys.argv[7]))

clf.fit(X_train, y_train)
#accuracy = clf.score(X_train, y_train)
y_train_pred=clf.predict(X_train)
accuracy=metrics.accuracy_score(y_train, y_train_pred)
confusion_matrix = metrics.confusion_matrix(y_train, y_train_pred)
classification = metrics.classification_report(y_train, y_train_pred)
print()
print('==============================  Model performance on training data ==============================')
print()
print ("Training Accuracy:" "\n", accuracy)
print()
print("Confusion matrix for training data:" "\n", confusion_matrix)
print()
print("Classification report for training data:" "\n", classification) 
print()

y_pred_test=clf.predict(X_test)
#test_acc=clf.score(X_test, y_pred_test)
test_acc=metrics.accuracy_score(y_test, y_pred_test)
cnf_mat_test=metrics.confusion_matrix(y_test, y_pred_test)
clf_report=metrics.classification_report(y_test, y_pred_test)
print('==============================  Model performance on testing data ==============================')

print()
print ("Testing Accuracy:" "\n", test_acc)
print()
print("Confusion matrix for testing data:" "\n", cnf_mat_test)
print()
print("Classification report for testing data:" "\n", clf_report)




# In[ ]:




