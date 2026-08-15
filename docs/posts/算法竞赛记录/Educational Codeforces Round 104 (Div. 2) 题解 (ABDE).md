---
title: Educational Codeforces Round 104 (Div. 2) 题解 (ABDE)
date: 2021-02-16 08:37:00
permalink: /pages/13e4fe/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[传送门](https://codeforces.com/contest/1487)

## A. Arena

只要有人比英雄 X 弱，我们就一直让英雄 X 和这个人打架，然后英雄 X 就成为了 winner。

答案为 n - 最小值的个数。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
int a[N];
void Solve(){
    int n=read();
    repeat(i,0,n){
        a[i]=read();
    }
    printf("%d\n",n-count(a,a+n,*min_element(a,a+n)));
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## B. Cat Cycle

将 B 猫作为参考系，那么 A 猫的位置有周期性的。只要算 B 猫位置和 A 猫相对 B 猫的位置。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
int a[N];
void Solve(){
    int n=read(),k=read();
    if(n%2==0)
        printf("%d\n",(k-1)%n+1);
    else{
        int T=n/2;
        int delta=(k-1)%T*2+1;
        int pos=n-(k-1)%n;
        printf("%d\n",(pos+delta-1)%n+1);
    }
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## C. Minimum Ties

抱歉我解释不来，只能提供个代码。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=110; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
int a[N][N];
void Solve(){
    int n=read();
    repeat(i,1,n+1)repeat(j,1,n+1)a[i][j]=0;
    for(int i=2;n-i+2>i;i++){
        repeat(j,1,n+1){
            a[j][(i+j-2)%n+1]=1;
            a[(i+j-2)%n+1][j]=-1;
        }
    }
    repeat(i,1,n+1)
    repeat(j,i+1,n+1)
        printf("%d ",a[i][j]);
    puts("");
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## D. Pythagorean Triples

由

$$
a^2=c+b\\
a^2=c^2-b^2
$$

下面除以上面得

$$
1=c-b
$$

然后暴力遍历 a 就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=110; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
int a[N][N];
void Solve(){
    int n=read(); ll ans=0;
    for(ll a=3;a*a<=n+n-1;a+=2){
        ans++;
    }
    printf("%lld\n",ans);
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## E. Cheap Dinner

dp，每个菜都看作一个顶点，第一类菜到第二类菜连成完全二分图（但是去掉输入的几条边），二到三、三到四类似，然后跑最短路径。直接跑是肯定超时的，由于对于某一类菜的每个节点只要求连接前一类菜代价最低的那个，因此只要对前一类菜按代价升序排序，依次访问直到遇到第一个可以连边的就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
pair<int,int> a[4][N];
int n[4];
vector<int> edge[N];
int vis[N],dcnt;
void Solve(){
    repeat(i,0,4)n[i]=read();
    repeat(i,0,4)
    repeat(j,0,n[i])
        a[i][j]={read(),j};
    repeat(i,0,3){
        int m=read();
        repeat(j,0,n[i+1])edge[j].clear();
        repeat(j,0,m){
            int x=read()-1,y=read()-1;
            edge[y].push_back(x);
        }
        sort(a[i],a[i]+n[i]);
        repeat(j,0,n[i+1]){
            dcnt++;
            for(auto k:edge[j])vis[k]=dcnt;
            int ans=5e8;
            repeat(k,0,n[i])
            if(vis[a[i][k].second]!=dcnt){
                ans=a[i][k].first;
                break;
            }
            a[i+1][j].first+=ans;
        }
    }
    int ans=min_element(a[3],a[3]+n[3])->first;
    if(ans>=(int)5e8)ans=-1;
    printf("%d\n",ans);
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; // T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```
